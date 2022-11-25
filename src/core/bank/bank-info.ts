/* Generated with TypeScript snippets */

/** BankInfo **
* ...
* @Author Star Noob
* @Created 2022-09-25
*/

export class BankInfo {

	private _bankName: string;
	private _authorID: string;
	private _playerID: string;

	constructor(bankName: string, authorID: string, playerID: string) {
		this._bankName = bankName;
		this._authorID = authorID;
		this._playerID = playerID;
	}

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	public getAuthorNumber(): number {
		return parseInt(this._authorID.split('-')[3]);
	}

	public getPlayerNumber(): number {
		return parseInt(this._playerID.split('-')[3]);
	}

	public get bankName(): string {
		return this._bankName;
	}

	public get authorID(): string {
		return this._authorID;
	}

	public get playerID(): string {
		return this._playerID;
	}
}