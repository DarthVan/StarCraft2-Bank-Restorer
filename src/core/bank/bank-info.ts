/* Generated with TypeScript snippets */

/** BankInfo **
* ...
* @Author Star Noob
* @Created 2022-09-25
*/

export class BankInfo {

	private _name: string;
	private _authorAccount: string;
	private _playerAccount: string;

	constructor(name: string, authorAccount: string, playerAccount: string) {
		this._name = name;
		this._authorAccount = authorAccount;
		this._playerAccount = playerAccount;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public getAuthorNumber(): number {
		return parseInt(this._authorAccount.split('-')[3]);
	}

	public getPlayerNumber(): number {
		return parseInt(this._playerAccount.split('-')[3]);
	}

	public get name(): string {
		return this._name;
	}

	public get authorAccount(): string {
		return this._authorAccount;
	}

	public get playerAccount(): string {
		return this._playerAccount;
	}
}