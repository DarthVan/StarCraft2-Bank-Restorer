/* Generated with TypeScript snippets */

import { sc2_FixedToString } from '@src/core/sc2';
import { hashSHA1 } from '@src/utils/sha1';
import { BankInfo, BankKey, BankKeyType, BankMap } from '.';

/** Bank **
* ...
* @Author Star Noob
* @Created 2022-09-24
*/

export default class Bank {

	public _signature: string;
	public _version: string;

	private _info: BankInfo;
	private _sections: BankMap<BankMap<BankKey>>;

	constructor(bankName: string, authorID: string, playerID: string, version?: string) {
		this._info = new BankInfo(bankName, authorID, playerID);
		this._version = version ? version : '1';
		this.init();
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	/** Parse xml and generate new data */
	public parse(data: any): void {
		//console.log('constructor name:', <any>data.constructor.name)
		//console.log('type of:', typeof data)
		let xml: Element = null;
		const parser: DOMParser = new DOMParser();
		try {
			if (typeof data == 'string')
				xml = parser.parseFromString(data, 'text/xml').firstElementChild;
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

		this._signature = null;

		try {
			this._signature = xml.getElementsByTagName('Signature')[0].getAttribute('value');
		} catch (error) {
			this._signature = null;
		}

		//console.log('banks signature:', this._signature);
	}

	/** Add section to the bank, if exist, returning it */
	public addSection(name: string): BankMap<BankKey> {
		if (!this._sections.has(name))
			this._sections.set(name, new BankMap(name));
		return this._sections.get(name);
	}

	/** Add key to the section, if exist, updating it */
	public addKey(key: string, type: keyof typeof BankKeyType, value: any, section: string): BankKey {
		const s: BankMap<BankKey> = this.addSection(section);
		switch (typeof value) {
			case 'boolean': value = value ? '1' : '0'; break;
			case 'number': value = value.toString(); break;
			case 'string': break;
			case 'object':
				if (type == 'POINT')
					value = sc2_FixedToString((value as any).x) + ',' + sc2_FixedToString((value as any).y);
				break;
		}
		if (!s.has(key))
			s.set(key, new BankKey(key, BankKeyType[type], value));
		else
			s.get(key).update(value);
		return s.get(key);
	}

	public getKey(key: string, section: string): BankKey {
		if (this._sections.has(section))
			return this._sections.get(section).get(key);
		return null;
	}

	public removeSection(name: string): boolean {
		return this._sections.delete(name);
	}

	/** Remove key, if exist */
	public removeKey(key: string, section: string): boolean {
		if (!this._sections.has(section))
			return false;
		return this._sections.get(section).delete(key);
	}

	/** Sort all bank data */
	public sort(): void {
		this._sections.forEach((section: BankMap<BankKey>): void => {
			this._sections.set(section.name, section.sort(), true);
		});
		this._sections = this._sections.sort();
	}

	/** Generate xml-string from bank's data */
	public getAsString(): string {
		let s: string = '<?xml version="1.0" encoding="utf-8"?>\n<Bank version="' + this._version + '">\n';

		this._sections.forEach((section: BankMap<BankKey>): void => {
			s += '\t<Section name="' + section.name + '">\n';
			section.forEach((key: BankKey): void => {
				s += '\t\t<Key name="' + key.name + '">\n';
				s += '\t\t\t<Value ' + key.type + '="' + key.stringValue + '"/>\n';
				s += '\t\t</Key>\n';
			});
			s += '\t</Section>\n';
		});

		if (this._signature)
			s += '\t<Signature value="' + this._signature + '"/>\n';

		s += '</Bank>';

		return s;
	}

	/** Update bank's signature */
	public updateSignature(): string {
		let s: string = '';

		s += this._info.authorID;
		s += this._info.playerID;
		s += this._info.bankName;

		this._sections.forEach((section: BankMap<BankKey>): void => {
			s += section.name;
			section.forEach((key: BankKey): void => {
				s += key.name;
				s += 'Value';
				s += key.type;
				if (key.type != BankKeyType.TEXT)
					s += key.stringValue;
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
		xmlhttp.open('GET', url, true);
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
		this._sections = new BankMap<BankMap<BankKey>>('Sections');
	}
}