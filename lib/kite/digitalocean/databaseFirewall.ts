/**
 * @author Brandon Kalinowski
 * @copyright 2020 Brandon Kalinowski
 * @license Not Provided. Contact for details.
 */
// *** WARNING: this file was generated by the Kite Terraform Bridge (tfgen) Tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kite from 'https://deno.land/x/lib/kite.ts'
import * as inputs from './types/input.ts'
import * as outputs from './types/output.ts'

/**
 * Provides a DigitalOcean database firewall resource allowing you to restrict
 * connections to your database to trusted sources. You may limit connections to
 * specific Droplets, Kubernetes clusters, or IP addresses.
 *
 * > This content is derived from https://github.com/terraform-providers/terraform-provider-digitalocean/blob/master/website/docs/r/database_firewall.html.markdown.
 */
export class DatabaseFirewall extends kite.Resource {
	/**
	 * The ID of the target database cluster.
	 */
	public readonly clusterId!: string
	/**
	 * A rule specifying a resource allowed to access the database cluster. The following arguments must be specified:
	 * - `type` - (Required) The type of resource that the firewall rule allows to access the database cluster. The possible values are: `droplet`, `k8s`, `ipAddr`, or `tag`.
	 * - `value` - (Required) The ID of the specific resource, the name of a tag applied to a group of resources, or the IP address that the firewall rule allows to access the database cluster.
	 */
	public readonly rules!: outputs.DatabaseFirewallRule[]

	/**
	 * Create a DatabaseFirewall resource with the given unique name, arguments, and options.
	 *
	 * @param name The _unique_ name of the resource.
	 * @param args The arguments to use to populate this resource's properties.
	 */
	constructor(name: string, args: DatabaseFirewallArgs) {
		let inputs: any = {}
		if (!args || args.clusterId === undefined) {
			throw new Error("Missing required property 'clusterId'")
		}
		if (!args || args.rules === undefined) {
			throw new Error("Missing required property 'rules'")
		}
		inputs.clusterId = args ? args.clusterId : undefined
		inputs.rules = args ? args.rules : undefined
		super(name, inputs)
		this.setType(DatabaseFirewall.__kiteType)
	}
	/**
	 * Used to map camelCased properties to Terraform snake_case
	 * @internal
	 */
	static convertMap: Record<string, string> = {
		clusterId: 'cluster_id',
		rules: 'rule',
	}

	/**
	 * Transforms the Resource instance into the Terraform JSON representation.
	 * @internal
	 */
	convert() {
		const props: any = {}
		Object.entries(this).forEach(([key, value]) => {
			const newKey = DatabaseFirewall.convertMap[key]
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
				digitalocean_database_firewall: { [this.__name]: props },
			},
		}
	}

	/** @internal */
	public static readonly __kiteType = 'tf:digitalocean:index:DatabaseFirewall'
	/** @internal */
	public static readonly __tfType = 'digitalocean_database_firewall'

	/** @internal */
	public id() {
		return DatabaseFirewall.__tfType + '.' + this.__name
	}
}

/**
 * The set of arguments for constructing a DatabaseFirewall resource.
 */
export interface DatabaseFirewallArgs {
	/**
	 * The ID of the target database cluster.
	 */
	readonly clusterId: string
	/**
	 * A rule specifying a resource allowed to access the database cluster. The following arguments must be specified:
	 * - `type` - (Required) The type of resource that the firewall rule allows to access the database cluster. The possible values are: `droplet`, `k8s`, `ipAddr`, or `tag`.
	 * - `value` - (Required) The ID of the specific resource, the name of a tag applied to a group of resources, or the IP address that the firewall rule allows to access the database cluster.
	 */
	readonly rules: inputs.DatabaseFirewallRule[]
}