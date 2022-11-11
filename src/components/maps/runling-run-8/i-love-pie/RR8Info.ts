/* Generated with TypeScript snippets */

import { SCModule } from "src/core/scarcode/sc-module";
import { SCParam } from "src/core/scarcode/sc-param";

/** RR8Info **
* ...
* @Author Star Noob
* @Created 2022-11-03
*/

export class RR8Info extends SCModule {

	//-------------------------------------------------- PUBLIC ---------------------------------------------------

	// sum of all stats params
	public getSum(): number {
		let sum: number = 0;
		for (let i: number = 0; i < 16; i++)
			if (i < 10 || i > 12)
				sum += this._queue[i].current;
		return sum;
	}

	//------------------------------------------------- PROTECTED -------------------------------------------------

	protected override init(): void {
		super.init();

		this._queue = [

			// stats
			new SCParam(500, 90000, 'Normal games'),
			new SCParam(25, 100000, 'Normal games won'),

			new SCParam(55, 110000, 'Hard games'),
			new SCParam(5, 120000, 'Hard games won'),

			new SCParam(12000, 93000000, 'Total saves'),
			new SCParam(99999, 94000000, 'Total score'),
			new SCParam(2000, 96000000, 'Total deaths'),

			new SCParam(200, 150000, 'Boss1 kills'),
			new SCParam(100, 160000, 'Boss2 kills'),
			new SCParam(25, 170000, 'Boss3 kills'), // i9

			new SCParam(25, 180000, 'Insane games'), // -
			new SCParam(2, 190000, 'Insane games won'), // -

			new SCParam(1, 200000, 'Not used'), // bank03  i12

			new SCParam(10, 210000, 'Chaos mode games'),
			new SCParam(1, 220000, 'Chaos mode games won'),

			new SCParam(25, 230000, 'Prestige'),


			// settings
			new SCParam(72, 1000, 'Distance'),
			new SCParam(90, 1001, 'Rotation'),
			new SCParam(90, 1002, 'Angle'),
			new SCParam(1, 1003, 'Camera follow unit'),
			new SCParam(0, 1004, 'Hide tips'),
			new SCParam(1, 1005, 'Hud on'),
			new SCParam(0, 1006, 'Mini map'),
			new SCParam(0, 1007, 'Energy bar'),
			new SCParam(0, 1008, 'Exp bar'),
			new SCParam(0, 1009, 'Menu'),
			new SCParam(1, 1010, 'WASD'),
			new SCParam(0, 10, 'Increase distance'),
			new SCParam(0, 11, 'Decrease distance'),
			new SCParam(0, 12, 'Rotation right'),
			new SCParam(0, 13, 'Rotation left'),
			new SCParam(1, 14, 'Follow runling')

			/* lib2_gv_followRunlingBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(14);
			lib2_gv_rotationRightBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(13);
			lib2_gv_rotationLeftBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(12);
			lib2_gv_decreaseDistanceBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(11);
			lib2_gv_increaseDistanceBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(10);
			lib2_gv_hUDWASDMovementBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1010);
			lib2_gv_hUDMenuBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1009);
			lib2_gv_hUDEXPBarBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1008);
			lib2_gv_hUDEnergyBarBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1007);
			lib2_gv_hUDMiniMapBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1006);
			lib2_gv_hUDOnBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1005);
			lib2_gv_hideTipsBank[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1004);
			lib2_gv_cameraFollowUnit[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1003);
			lib2_gv_angleNumber[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1002);
			lib2_gv_rotationNumber[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1001);
			lib2_gv_distanceNumber[auto27F0D9BC_var] = lib1_gf_StarcodeGetIntegerValue(1000); */
		];

	}

}