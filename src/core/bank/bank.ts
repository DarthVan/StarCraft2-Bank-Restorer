/* Generated with TypeScript snippets */

import { hashSHA1 } from "src/utils/sha1";
import { BankInfo } from "./bank-info";
import { BankKey } from "./bank-key";
import { BankKeyType } from "./bank-key-type";
import { BankMap } from "./bank-map";

/** Bank **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

export class Bank {

	private _info: BankInfo;
	private _sections: BankMap<BankMap<BankKey>>;
	public _signature: string;
	public _version: string;

	constructor(name: string, authorAccount: string, playerAccount: string, version?: string) {
		this._info = new BankInfo(name, authorAccount, playerAccount);
		this._version = version;
		this.init();
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public parse(data: any): void {
		//console.log('constructor name:', <any>data.constructor.name)
		//console.log('type of:', typeof data)
		let xml: Element = null;
		const parser: DOMParser = new DOMParser();
		try {
			if (typeof data == "string")
				xml = parser.parseFromString(data, "text/xml").firstElementChild;
			else
				throw new Error('Received data is not valid xml!');
		}
		catch (error: any) {
			throw new Error('Received data is not valid xml!');
			return;
		}

		if (xml == null)
			return;

		this._version = xml.getAttribute('version');

		if (xml.firstChild.nodeName == 'Bank')
			xml = xml.firstElementChild;

		this._sections.clear();

		const xmlsections: HTMLCollectionOf<Element> = xml.getElementsByTagName('Section');
		for (let i: number = 0; i < xmlsections.length; i++) {
			const section: BankMap<BankKey> = new BankMap<BankKey>(xmlsections[i].getAttribute('name'));
			const xmlkeys: HTMLCollectionOf<Element> = xmlsections[i].getElementsByTagName('Key');
			for (let j: number = 0; j < xmlkeys.length; j++) {
				const xmlKey: Element = xmlkeys[j];
				const name: string = xmlKey.getAttribute('name');
				const type: string = xmlKey.firstElementChild.attributes.item(0).name;
				const value: string = xmlKey.firstElementChild.getAttribute(type);
				section.set(name, new BankKey(name, type, value));
			}
			this._sections.set(section.name, section);
		}

		this._signature = xml.getElementsByTagName('Signature')[0].getAttribute('value');

		//console.log('banks signature:', this._signature);
	}

	public sort(): void {
		this._sections.forEach((section: BankMap<BankKey>): void => {
			this._sections.set(section.name, section.sort(), true);
		});
		this._sections = this._sections.sort();
	}

	public getAsString(): string {
		let s: string = '<?xml version="1.0" encoding="utf-8"?>\n<Bank version="' + this._version + '">\n';

		this._sections.forEach((section: BankMap<BankKey>): void => {
			s += '\t<Section name="' + section.name + '">\n';
			section.forEach((key: BankKey): void => {
				s += '\t\t<Key name="' + key.name + '">\n';
				s += '\t\t\t<Value ' + key.type + '="' + key.value + '"/>\n';
				s += '\t\t</Key>\n';
			});
			s += '\t</Section>\n';
		});

		s += '\t<Signature value="' + this._signature + '"/>\n';
		s += '</Bank>';

		return s;
	}

	public updateSignature(): string {
		let s: string = '';

		s += this._info.authorAccount;
		s += this._info.playerAccount;
		s += this._info.name;

		this._sections.forEach((section: BankMap<BankKey>): void => {
			s += section.name;
			section.forEach((key: BankKey): void => {
				s += key.name;
				s += 'Value';
				s += key.type;
				if (key.type != BankKeyType.TEXT)
					s += key.value;
			});
		});

		//console.log('string for sha1:', s);

		return this._signature = hashSHA1(s).toUpperCase();
	}

	public async openFile(url: string, onReady?: () => void): Promise<void> {
		const xmlhttp: XMLHttpRequest = new XMLHttpRequest();
		xmlhttp.onreadystatechange = (): void => {
			// Request finished and response, is ready and Status is "OK"
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				this.parse.call(this, xmlhttp.response);
				if (onReady)
					onReady();
			}
		};

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

	public get info(): BankInfo {
		return this._info;
	}

	public get sections(): BankMap<BankMap<BankKey>> {
		return this._sections;
	}

	public get signature(): string {
		return this._signature;
	}

	public get version(): string {
		return this._version;
	}

	//-------------------------------------------------- PRIVATE --------------------------------------------------

	private init(): void {
		this._sections = new BankMap<BankMap<BankKey>>("Sections");
	}
}