/**
 * @memberof Docable.Compilers
 * @class JsonCompiler
 *
 * @description
 *     This compiler reads doc blocks and converts and combines them into a JSON
 *     object.
 */
var JsonCompiler = /** @class */ (function () {
    function JsonCompiler() {
        this.re_description_stop_points = new RegExp(/@(param|return|throws)/, "g");
        this.re_export = new RegExp(/export.+/, "g");
        this.re_for_all_members = new RegExp(/\/\*\*((\s)+\*.*)+?\s+\*\/\n(export)?( +)?(export|constructor|interface|public|protected|private) ?(((\w+ {(\n.+\?:.+;)+)\n})|(((\w+ )*{)|(\w+.+;)|((async|function)? ?(\w+)?\(.+\)?{)|((async|function)? ?(\w+)?\(((\n? + .+:.+,?)+({|(\n( +)?\).+{))))))/, "g");
        this.re_ignore_block = new RegExp(/@ignore/, "g");
        this.re_ignore_line = new RegExp(/@ignore-line/);
        this.re_is_class = new RegExp(/\* @class/);
        this.re_is_enum = new RegExp(/@enum +\w+/);
        this.re_is_function = new RegExp(/@(function|func|method) +\w+/);
        this.re_is_interface = new RegExp(/@interface +\w+/);
        this.re_is_const = new RegExp(/export? ?const +\w+(: +\w+)? += +?.+/, "g");
        this.re_is_method = new RegExp(/.+(static|public|protected|private)( async)? \w+\((\n.+)?(\n +\))?.+((\n? + .+:.+,?)+{)?/);
        this.re_is_constructor = new RegExp(/.+constructor\((.+)?\)?/);
        this.re_is_property = new RegExp(/@property/);
        this.re_members_only = new RegExp(/\/\/\/ +@members-only/);
        this.re_namespace = new RegExp(/@memberof.+/);
        this.re__member_names = "@(class|enum|function|func|interface|method|module)";
        /**
         * @description
         *     The decoder used to decode the files passed to `this.compile()`.
         *
         * @property TextDecoder decoder
         */
        this.decoder = new TextDecoder();
        /**
         * @description
         *     A property to hold the final result of `this.compile()`.
         *
         * @property any parsed
         */
        this.parsed = {};
        /**
         * Is the compiler currently parsing a file with the `@members-only`
         * annotation?
         *
         * @property boolean parsing_members_only_file
         */
        this.parsing_members_only_file = false;
    }
    // FILE MARKER: PUBLIC ///////////////////////////////////////////////////////
    /**
     * @description
     *     Compile a JSON array containing classes, properties, and methods from
     *     the specified files.
     *
     *     All files passed to this method will have their doc blocks parsed for
     *     member data.
     *
     *     Any member that doesn't include the `@memberof` annotation will be
     *     placed as a top-level item.
     *
     * @param string fileContents
     *     The array of files containing doc blocks to parse.
     *
     * @return any
     *     Returns the JSON array.
     */
    JsonCompiler.prototype.compile = function (fileContents) {
        this.parsed = {};
        // If a file has `@members-only`...
        if (this.re_members_only.test(fileContents)) {
            this.parsing_members_only_file = true;
            this.parseMembersOnlyFile(fileContents);
            return this.parsed;
        }
        this.parsing_members_only_file = false;
        this.parseClassFile(fileContents);
        return this.parsed;
    };
    /**
     * @description
     *     Get the specified `@annotationname` definitions from the specified doc
     *     block.
     *
     * @param string annotation
     *     The annotation to get in the following format: `@annotationname`.
     * @param string docBlock
     *     The docBlock to get the `@annotationname` definitions from.
     *
     * @return any
     *     Returns an array of data related to the specified annotation.
     */
    JsonCompiler.prototype.getSection = function (annotation, docBlock) {
        var _this = this;
        //
        // The original regex (without doubling the backslashes) is:
        //
        //     new RegExp(/@annotation\n?.+((\n +\* +)[^@].+)*(?:(\n +\*?\n? +\* + .*)+)?/, "g");
        //
        // @annotation is the targeted annotation block (e.g., @param).
        // The \n after @annotation ensures we can parse @description\n or any other
        // annotation that doesn't have trailing characters.
        //
        var re = new RegExp("\\* " +
            annotation +
            "\n?.+((\n +\\* +)[^@].+)*(?:(\n +\\*?\n? +\\* + .*)+)?", "g");
        var matches = docBlock.match(re);
        var ret = {};
        if (!matches) {
            return null;
        }
        if (matches.length <= 0) {
            return null;
        }
        // Parsing @description?
        if (annotation == "@description") {
            var description_1 = [];
            matches.forEach(function (text) {
                var textBlockByLine = text.split("\n");
                textBlockByLine.shift();
                description_1 = _this.getDescription(textBlockByLine.join("\n"));
            });
            return description_1;
        }
        // Parsing the following?
        var arrayedAnnotations = ["@returns", "@return", "@throws", "@throw"];
        if (arrayedAnnotations.indexOf(annotation) != -1) {
            var annotationBlocks_1 = [];
            matches.forEach(function (text) {
                var textBlockByLine = text.split("\n");
                textBlockByLine.shift();
                var description = _this.getDescription(textBlockByLine.join("\n"));
                var parsedAnnotation = _this.getAnnotation(annotation, text);
                annotationBlocks_1.push({
                    description: description,
                    annotation: parsedAnnotation
                });
            });
            return annotationBlocks_1;
        }
        // Default parsing
        var annotationBlocks = {};
        matches.forEach(function (text) {
            var textBlockByLine = text.split("\n");
            textBlockByLine.shift();
            var name = _this.getMemberName(text, annotation);
            var description = _this.getDescription(textBlockByLine.join("\n"));
            var parsedAnnotation = _this.getAnnotation(annotation, text);
            annotationBlocks[name] = {
                name: name,
                description: description,
                annotation: parsedAnnotation
            };
        });
        return annotationBlocks;
    };
    // FILE MARKER: PROTECTED ////////////////////////////////////////////////////
    /**
     * @description
     *     Get the value of the `@memberof` annotation and use it to create a key
     *     in `this.parsed`.
     *
     * @param string docBlock
     *     The doc block in question.
     *
     * @return string
     */
    JsonCompiler.prototype.getAndCreateNamespace = function (docBlock) {
        var _this = this;
        // Look for a namespace using the value of the `@memberof` annotation. If
        // a namespace isn't found, then the file being parsed will be placed as a
        // top-level item in the JSON array.
        if (!this.re_namespace.test(docBlock)) {
            return;
        }
        // Create the namespace by taking the `@memberof Some.Namespace` and
        // transforming it into `Some.Namespace`
        var reNamespaceResults = docBlock.match(this.re_namespace);
        var currentNamespace = null;
        reNamespaceResults.forEach(function (fileLine) {
            if (currentNamespace) {
                return;
            }
            if (_this.re_ignore_line.test(fileLine)) {
                return;
            }
            currentNamespace = fileLine
                .trim()
                .replace(/\*? ?@memberof +/, "")
                .trim();
        });
        // Create the namespace in the `parsed` property so we can start storing
        // the namespace's members in it
        if (!this.parsed.hasOwnProperty(currentNamespace)) {
            this.parsed[currentNamespace] = {};
        }
        return currentNamespace;
    };
    /**
     * @description
     *     Get the `@annotationname` line.
     *
     * @param string annotation
     *     The annotation to get from the doc block.
     * @param string docBlock
     *     The doc block to get the `@annotationname` definitions from.
     *
     * @return any
     *     Returns an object containing the annotation lines data.
     */
    JsonCompiler.prototype.getAnnotation = function (annotation, docBlock) {
        var re = new RegExp(annotation + ".+", "g");
        var match = docBlock.match(re);
        var line = {
            line: null,
            data_type: null,
            name: null
        };
        if (match) {
            var lineParts = match[0].split(" ");
            line.line = match[0];
            line.data_type = lineParts[1];
            line.name = lineParts[2] ? lineParts[2] : null;
        }
        return line;
    };
    /**
     * @description
     *     Get the description of the specified doc block. The description is the
     *     start of the doc block down to one of the annotation tags: `@param`,
     *     `@return`, `@throws`.
     *
     * @param string textBlock
     *     The text block in question.
     *
     * @return string[]
     *     Returns an array of descriptions.
     */
    JsonCompiler.prototype.getDescription = function (textBlock) {
        var _this = this;
        var textBlockByLine = textBlock.split("\n");
        var result = "";
        var endOfDescription = false;
        textBlockByLine.forEach(function (line) {
            if (endOfDescription) {
                return;
            }
            // Is this the beginning of a doc block?
            if (line.trim() == "/**") {
                line = line.trim().replace("/**", "");
            }
            // If we hit an annotation tag, then that means the we've reached the end
            // of the description. Also, if we've hit the */ line, then that means
            // we've hit the end of the doc block and no more parsing is needed.
            if (_this.re_description_stop_points.test(line) || line.trim() == "*/") {
                endOfDescription = true;
                return;
            }
            result += line + "\n";
        });
        return this.getDescriptionInParagraphs(result);
    };
    /**
     * @description
     *     Get paragraphs from the description text blocks.
     *
     * @param string textBlock
     *     The text block containing the paragraph(s).
     *
     * @return string[]
     *     Returns an array of strings. Each element in the array is a separate
     *     paragraph.
     */
    JsonCompiler.prototype.getDescriptionInParagraphs = function (textBlock) {
        var textBlockInLines = textBlock.split("\n");
        textBlockInLines = textBlockInLines.map(function (line) {
            if (line.trim() === "*") {
                return "---para-break---";
            }
            // A new paragraph is preceded by a "*" and it won't be replaced. We
            // can use this fact to separate paragraphs.
            return line.replace(" * ", "").trim();
        });
        textBlockInLines = textBlockInLines
            .join("\n")
            .split("---para-break---")
            .map(function (val) {
            return val.trim();
        });
        // Filter out lines that don't contain anything
        textBlockInLines = textBlockInLines.filter(function (val) {
            return val.trim() != "";
        });
        return textBlockInLines;
    };
    /**
     * @description
     *     Get the doc block data for the interface in question.
     *
     * @param string text
     *     The text containing the interface's data.
     *
     * @return any
     */
    JsonCompiler.prototype.getDocBlockDataForConst = function (text) {
        return {
            is_exported: this.isMemberExported("const", text),
            name: this.getNameOfConst(text),
            description: this.getSection("@description", text)
            // signature: this.getSignatureOfInterface(text)
        };
    };
    /**
     * @description
     *     Get the doc block data for the enum in question.
     *
     * @param string text
     *     The text containing the enum's data.
     *
     * @return any
     */
    JsonCompiler.prototype.getDocBlockDataForEnum = function (text) {
        var ret = {
            is_exported: this.isMemberExported("enum", text),
            name: this.getNameOfEnum(text),
            description: this.getSection("@description", text)
        };
        return ret;
    };
    /**
     * @description
     *     Get the doc block data for the function in question.
     *
     * @param string text
     *     The text containing the functions's data.
     *
     * @return any
     */
    JsonCompiler.prototype.getDocBlockDataForFunction = function (text) {
        var ret = {
            is_exported: this.isMemberExported("function", text),
            name: this.getNameOfFunction(text),
            description: this.getSection("@description", text),
            params: this.getSection("@param", text),
            returns: this.getSection("@return", text),
            throws: this.getSection("@throws", text),
            signature: this.getSignatureOfMethod(text)
        };
        return ret;
    };
    /**
     * @description
     *     Get the doc block data for the interface in question.
     *
     * @param string text
     *     The text containing the interface's data.
     *
     * @return any
     */
    JsonCompiler.prototype.getDocBlockDataForInterface = function (text) {
        return {
            is_exported: this.isMemberExported("interface", text),
            name: this.getMemberName(text),
            description: this.getSection("@description", text),
            signature: this.getSignatureOfInterface(text)
        };
    };
    /**
     * @description
     *     Get the doc block data for the method in question.
     *
     * @param string text
     *     The text containing the method's data.
     *
     * @return any
     */
    JsonCompiler.prototype.getDocBlockDataForMethod = function (text) {
        var signature = this.getSignatureOfMethod(text);
        // Methods have constructors which are always public, so we want to make
        // sure the `construct()` function's access modifier isn't "constructor"
        // because the access modifier was omitted.
        var accessModifier = /constructor/.test(signature)
            ? "public"
            : signature.split(" ")[0];
        var ret = {
            access_modifier: accessModifier,
            name: '',
            description: this.getSection("@description", text),
            params: this.getSection("@param", text),
            returns: this.getSection("@return", text),
            throws: this.getSection("@throws", text),
            signature: signature,
            is_async: /async/.test(signature)
        };
        return ret;
    };
    /**
     * @description
     *     Get the doc block data for the property in question.
     *
     * @param string text
     *     The text containing the property's data.
     *
     * @return any
     */
    JsonCompiler.prototype.getDocBlockDataForProperty = function (text) {
        var signature = this.getSignatureOfProperty(text);
        var accessModifier = signature.split(" ")[0];
        var ret = {
            access_modifier: accessModifier,
            description: this.getSection("@description", text),
            annotation: this.getAnnotation("@property", text),
            signature: signature
        };
        return ret;
    };
    /**
     * @description
     *     Get the value of the `@class` annotation.
     *
     * @param string text
     *     The text in question.
     *
     * @return string
     */
    JsonCompiler.prototype.getMemberName = function (text, textType) {
        var matches = text.match(new RegExp(this.re__member_names + ".+", "g"));
        if (matches && matches.length > 0) {
            var memberName = text
                .match(new RegExp(this.re__member_names + ".+", "g"))[0]
                .replace(new RegExp(this.re__member_names + " +?", "g"), "")
                .trim();
            return memberName;
        }
        // No annotations? Default to this.
        var textByLine = text.split("\n");
        var line;
        switch (textType) {
            case "@param":
                line = textByLine[0];
                return line
                    .trim()
                    .replace(/ ?\* /g, "")
                    .trim()
                    .split(" ")[2];
            case "method":
                line = this.getMemberNameMethod(textByLine);
                return line
                    .trim()
                    .replace(/(public|protected|private) /g, "")
                    .replace(/async /g, "")
                    .split("(")[0];
            case "property":
                line = textByLine[textByLine.length - 1];
                return line
                    .trim()
                    .replace(/(public|protected|private) /g, "")
                    .replace(":", "")
                    .split(" ")[0];
            default:
                break;
        }
        return undefined;
    };
    JsonCompiler.prototype.getMemberNameInterface = function (textByLine, index, line) {
        if (index === void 0) { index = -1; }
        if (line === void 0) { line = ''; }
        if (index == -1) {
            index = textByLine.length - 1;
        }
        line = textByLine[index] + line;
        line = line.trim();
        // Check for the opening bracket because that line will have the
        // interface's name
        var paren = new RegExp(/\{/, "g");
        if (paren.test(line)) {
            // Add new lines so the signature looks like a pretty object
            line = line.replace("{", "{\n  ");
            line = line.replace(/;/g, ";\n  ");
            line = line.replace("  }", "}");
            return line;
        }
        index = index - 1;
        return this.getMemberNameInterface(textByLine, index, line);
    };
    JsonCompiler.prototype.getMemberNameMethod = function (textByLine, index, line) {
        if (index === void 0) { index = -1; }
        if (line === void 0) { line = ''; }
        if (index == -1) {
            index = textByLine.length - 1;
        }
        line = textByLine[index] + line;
        line = line.trim();
        // Check for the opening parenthesis because that line will have the
        // method's name
        var paren = new RegExp(/\(/, "g");
        if (paren.test(line)) {
            // Add a space after each comma
            line = line.replace(/,/g, ", ");
            // Just one space though...
            line = line.replace(/,  /g, ", ");
            return line;
        }
        index = index - 1;
        return this.getMemberNameMethod(textByLine, index, line);
    };
    /**
     * @description
     *     Get the name of the const.
     *
     * @param string text
     *     The text containing the const's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getNameOfConst = function (text) {
        var textByLine = text.split("\n");
        return textByLine[textByLine.length - 1]
            .trim()
            .replace("export", "")
            .replace("const", "")
            .replace(/: +?/, " ")
            .trim()
            .split(" ")[0];
    };
    /**
     * @description
     *     Get the name of the enum.
     *
     * @param string text
     *     The text containing the enum's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getNameOfEnum = function (text) {
        var textByLine = text.split("\n");
        return textByLine[textByLine.length - 1]
            .trim()
            .replace(/ ?{/, "")
            .replace(/export +? ?enum +?/, "");
    };
    /**
     * @description
     *     Get the name of the function.
     *
     * @param string text
     *     The text containing the function's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getNameOfFunction = function (text) {
        var signature = this.getSignatureOfMethod(text);
        return signature
            .replace(/export +?/, "")
            .replace(/function +?/, "")
            .replace(/\(.+/, "");
    };
    /**
     * @description
     *     Get the name of the property.
     *
     * @param string text
     *     The text containing the property's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getNameOfProperty = function (text) {
        var signature = this.getSignatureOfProperty(text);
        return signature
            .replace(/(public|private|protected) +/, "")
            .replace(/\(.+/, "");
    };
    /**
     * @description
     *     Get the signature of the function in question.
     *
     * @param string text
     *     The text containing the function's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getSignatureOfFunction = function (text) {
        // The signature is the last line of the doc block
        var textByLine = text.split("\n");
        return textByLine[textByLine.length - 1]
            .trim()
            .replace(/ ?{/, "")
            .replace("}", "");
    };
    /**
     * @description
     *     Get the signature of the interface in question.
     *
     * @param string text
     *     The text containing the interface's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getSignatureOfInterface = function (text) {
        var textByLine = text.split("\n");
        return this.getMemberNameInterface(textByLine);
    };
    /**
     * @description
     *     Get the signature of the method in question.
     *
     * @param string text
     *     The text containing the method's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getSignatureOfMethod = function (text) {
        var textByLine = text.split("\n");
        var line = this.getMemberNameMethod(textByLine);
        return line
            .trim()
            .replace(/ ?{/, "")
            .replace("}", "");
    };
    /**
     * @description
     *     Get the signature of the property in question.
     *
     * @param string text
     *     The text containing the property's data.
     *
     * @return string
     */
    JsonCompiler.prototype.getSignatureOfProperty = function (text) {
        // The signature is the last line of the doc block
        var textByLine = text.split("\n");
        return textByLine[textByLine.length - 1].trim().replace(";", "");
    };
    /**
     * Is the member exported?
     *
     * @param string memberType
     *     The member's type.
     * @param string text
     *     The text containing the `export` keyword if the member is exported.
     *
     * @return boolean
     *     Returns true if the member is exported and false if not.
     */
    JsonCompiler.prototype.isMemberExported = function (memberType, text) {
        var reMemberName = new RegExp(memberType);
        if (this.re_export.test(text)) {
            var exportLine = text.match(this.re_export);
            if (exportLine && exportLine.length > 0) {
                if (reMemberName.test(exportLine[0])) {
                    return true;
                }
            }
        }
        return false;
    };
    // FILE MARKER: PROTECTED - PARSERS //////////////////////////////////////////
    /**
     * @description
     *     Parse a file that has the `@members-only`
     *     annotation.
     *
     * @param string fileContents
     */
    JsonCompiler.prototype.parseMembersOnlyFile = function (fileContents) {
        var _this = this;
        var docBlocks = fileContents.match(this.re_for_all_members);
        docBlocks.forEach(function (docBlock) {
            if (_this.re_ignore_block.test(docBlock)) {
                return;
            }
            if (_this.re_is_function.test(docBlock)) {
                var currentNamespace = _this.getAndCreateNamespace(docBlock);
                var memberName = _this.getMemberName(docBlock);
                var data = _this.getDocBlockDataForFunction(docBlock);
                data.is_function = true;
                if (!currentNamespace) {
                    data.fully_qualified_name = memberName;
                    _this.parsed[memberName] = data;
                }
                else {
                    data.fully_qualified_name = currentNamespace + "." + memberName;
                    _this.parsed[currentNamespace][memberName] = data;
                }
                return;
            }
            if (_this.re_is_enum.test(docBlock)) {
                var currentNamespace = _this.getAndCreateNamespace(docBlock);
                var memberName = _this.getMemberName(docBlock);
                var data = _this.getDocBlockDataForEnum(docBlock);
                data.is_enum = true;
                if (!currentNamespace) {
                    data.fully_qualified_name = memberName;
                    _this.parsed[memberName] = data;
                }
                else {
                    data.fully_qualified_name = currentNamespace + "." + memberName;
                    _this.parsed[currentNamespace][memberName] = data;
                }
                return;
            }
            if (_this.re_is_interface.test(docBlock)) {
                var currentNamespace = _this.getAndCreateNamespace(docBlock);
                var memberName = _this.getMemberName(docBlock);
                var data = _this.getDocBlockDataForInterface(docBlock);
                data.is_interface = true;
                if (!currentNamespace) {
                    data.fully_qualified_name = memberName;
                    _this.parsed[memberName] = data;
                }
                else {
                    data.fully_qualified_name = currentNamespace + "." + memberName;
                    _this.parsed[currentNamespace][memberName] = data;
                }
                return;
            }
            if (_this.re_is_const.test(docBlock)) {
                var currentNamespace = _this.getAndCreateNamespace(docBlock);
                var data = _this.getDocBlockDataForConst(docBlock);
                data.is_const = true;
                if (!currentNamespace) {
                    data.fully_qualified_name = data.name;
                    _this.parsed[data.name] = data;
                }
                else {
                    data.fully_qualified_name = currentNamespace + "." + data.name;
                    _this.parsed[currentNamespace][data.name] = data;
                }
                return;
            }
        });
    };
    /**
     * @description
     *     Parse a file (assuming it's a class file). `this.compile()` defaults to
     *     using this method.
     *
     * @param string fileContents
     */
    JsonCompiler.prototype.parseClassFile = function (fileContents) {
        var _this = this;
        var docBlocks = fileContents.match(this.re_for_all_members);
        var classMap = {
            fully_qualified_name: null,
            namespace: null,
            name: null,
            description: null,
            properties: {},
            methods: {}
        };
        docBlocks.forEach(function (docBlock) {
            if (_this.re_ignore_block.test(docBlock)) {
                return;
            }
            if (_this.re_is_class.test(docBlock)) {
                classMap.namespace = _this.getAndCreateNamespace(docBlock);
                classMap.name = _this.getMemberName(docBlock);
                classMap.description = _this.getSection("@description", docBlock);
                classMap.fully_qualified_name = classMap.namespace
                    ? classMap.namespace + "." + classMap.name
                    : classMap.name;
                return;
            }
            if (_this.re_is_property.test(docBlock)) {
                var propertyName = _this.getMemberName(docBlock, "property");
                var data = _this.getDocBlockDataForProperty(docBlock);
                data.name = propertyName;
                data.fully_qualified_name =
                    classMap.fully_qualified_name + "." + propertyName;
                classMap.properties[propertyName] = data;
            }
            if (_this.re_is_constructor.test(docBlock)) {
                var methodName = _this.getMemberName(docBlock, "method");
                var data = _this.getDocBlockDataForMethod(docBlock);
                // TODO(crookse) remove part where constructor is checked... we know
                // it's a constructor, so just assign that here.
                data.name = 'constructor';
                data.fully_qualified_name =
                    classMap.fully_qualified_name + "()";
                classMap.methods[methodName] = data;
            }
            if (_this.re_is_method.test(docBlock)) {
                var methodName = _this.getMemberName(docBlock, "method");
                var data = _this.getDocBlockDataForMethod(docBlock);
                // TODO(crookse) find a way to clean this data.name assignment up
                data.name = methodName;
                data.fully_qualified_name =
                    classMap.fully_qualified_name + "." + methodName;
                classMap.methods[methodName] = data;
            }
        });
        if (!classMap.namespace) {
            this.parsed[classMap.name] = classMap;
        }
        else {
            this.parsed[classMap.namespace][classMap.name] = classMap;
        }
    };
    return JsonCompiler;
}());
