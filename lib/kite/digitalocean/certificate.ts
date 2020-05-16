/**
 * @author Brandon Kalinowski
 * @copyright 2020 Brandon Kalinowski
 * @license Not Provided. Contact for details.
 */
// *** WARNING: this file was generated by the Kite Terraform Bridge (tfgen) Tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kite from 'https://deno.land/x/lib/kite.ts'

import { CertificateType } from './mod.ts'

/**
 * Provides a DigitalOcean Certificate resource that allows you to manage
 * certificates for configuring TLS termination in Load Balancers.
 * Certificates created with this resource can be referenced in your
 * Load Balancer configuration via their ID. The certificate can either
 * be a custom one provided by you or automatically generated one with
 * Let's Encrypt.
 *
 * > This content is derived from https://github.com/terraform-providers/terraform-provider-digitalocean/blob/master/website/docs/r/certificate.html.markdown.
 */
export class Certificate extends kite.Resource {
	/**
	 * The full PEM-formatted trust chain
	 * between the certificate authority's certificate and your domain's TLS
	 * certificate. Only valid when type is `custom`.
	 */
	public readonly certificateChain!: string | undefined
	/**
	 * List of fully qualified domain names (FQDNs) for
	 * which the certificate will be issued. The domains must be managed using
	 * DigitalOcean's DNS. Only valid when type is `letsEncrypt`.
	 */
	public readonly domains!: string[] | undefined
	/**
	 * The contents of a PEM-formatted public
	 * TLS certificate. Only valid when type is `custom`.
	 */
	public readonly leafCertificate!: string | undefined
	/**
	 * The name of the certificate for identification.
	 */
	public readonly name!: string
	/**
	 * The expiration date of the certificate
	 */
	public readonly /*out*/ notAfter!: string
	/**
	 * The contents of a PEM-formatted private-key
	 * corresponding to the SSL certificate. Only valid when type is `custom`.
	 */
	public readonly privateKey!: string | undefined
	/**
	 * The SHA-1 fingerprint of the certificate
	 */
	public readonly /*out*/ sha1Fingerprint!: string
	public readonly /*out*/ state!: string
	/**
	 * The type of certificate to provision. Can be either
	 * `custom` or `letsEncrypt`. Defaults to `custom`.
	 */
	public readonly type!: CertificateType | undefined

	/**
	 * Create a Certificate resource with the given unique name, arguments, and options.
	 *
	 * @param name The _unique_ name of the resource.
	 * @param args The arguments to use to populate this resource's properties.
	 */
	constructor(name: string, args?: CertificateArgs) {
		let inputs: any = {}
		inputs.certificateChain = args ? args.certificateChain : undefined
		inputs.domains = args ? args.domains : undefined
		inputs.leafCertificate = args ? args.leafCertificate : undefined
		inputs.name = args ? args.name : undefined
		inputs.privateKey = args ? args.privateKey : undefined
		inputs.type = args ? args.type : undefined
		super(name, inputs)
		this.setType(Certificate.__kiteType)
		this.notAfter = `(( tf ${this.id()}.not_after ))` as any /*out*/
		this.sha1Fingerprint = `(( tf ${this.id()}.sha1_fingerprint ))` as any /*out*/
		this.state = `(( tf ${this.id()}.state ))` as any /*out*/
	}
	/**
	 * Used to map camelCased properties to Terraform snake_case
	 * @internal
	 */
	static convertMap: Record<string, string> = {
		certificateChain: 'certificate_chain',
		domains: 'domains',
		leafCertificate: 'leaf_certificate',
		name: 'name',
		privateKey: 'private_key',
		type: 'type',
		notAfter: 'undefined',
		sha1Fingerprint: 'undefined',
		state: 'undefined',
	}

	/**
	 * Transforms the Resource instance into the Terraform JSON representation.
	 * @internal
	 */
	convert() {
		const props: any = {}
		Object.entries(this).forEach(([key, value]) => {
			const newKey = Certificate.convertMap[key]
			if (!newKey) {
				throw new Error(
					`Could not print key: ${key}. Not found in ${
						(this as any).__type
					} spec.`
				)
			}
			if (newKey !== 'undefined' /* out */) {
				props[newKey] = value
			}
		})
		return {
			terraform: {
				required_providers: {
					digitalocean: '~> 1.13.0',
				},
			},
			resource: {
				digitalocean_certificate: { [this.__name]: props },
			},
		}
	}

	/** @internal */
	public static readonly __kiteType =
		'tf:digitalocean:index/certificate:Certificate'
	/** @internal */
	public static readonly __tfType = 'digitalocean_certificate'

	/** @internal */
	public id() {
		return Certificate.__tfType + '.' + this.__name
	}
}

/**
 * The set of arguments for constructing a Certificate resource.
 */
export interface CertificateArgs {
	/**
	 * The full PEM-formatted trust chain
	 * between the certificate authority's certificate and your domain's TLS
	 * certificate. Only valid when type is `custom`.
	 */
	readonly certificateChain?: string
	/**
	 * List of fully qualified domain names (FQDNs) for
	 * which the certificate will be issued. The domains must be managed using
	 * DigitalOcean's DNS. Only valid when type is `letsEncrypt`.
	 */
	readonly domains?: string[]
	/**
	 * The contents of a PEM-formatted public
	 * TLS certificate. Only valid when type is `custom`.
	 */
	readonly leafCertificate?: string
	/**
	 * The name of the certificate for identification.
	 */
	readonly name?: string
	/**
	 * The contents of a PEM-formatted private-key
	 * corresponding to the SSL certificate. Only valid when type is `custom`.
	 */
	readonly privateKey?: string
	/**
	 * The type of certificate to provision. Can be either
	 * `custom` or `letsEncrypt`. Defaults to `custom`.
	 */
	readonly type?: CertificateType
}
