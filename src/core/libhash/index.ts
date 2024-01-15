

/* Generated with TypeScript snippets */

import { sc2_ModF, sc2_ModI, sc2_mult, sc2_Pow } from "../sc2";


/** LibHash **
* ported from MD5/SHA256 Hash Library
* @Author Star Noob
* @Created 2023-12-10
*/

class LibHash {

  private readonly libHash_HashInputData: Uint8Array;
  private readonly libHash_asciiTable: string;
  private readonly libHash_HexTable: string[];

  private libHash_HashInputSize: number;

  constructor() {
    this.libHash_HashInputData = new Uint8Array(1024);
    this.libHash_asciiTable = "\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x1f\x20\x21\x22\x23\x24\x25\x26\x27\x28\x29\x2a\x2b\x2c\x2d\x2e\x2f\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x3a\x3b\x3c\x3d\x3e\x3f\x40\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4a\x4b\x4c\x4d\x4e\x4f\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5a\x5b\x5c\x5d\x5e\x5f\x60\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6a\x6b\x6c\x6d\x6e\x6f\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7a\x7b\x7c\x7d\x7e\x7f\x80\x81\x82\x83\x84\x85\x86\x87\x88\x89\x8a\x8b\x8c\x8d\x8e\x8f\x90\x91\x92\x93\x94\x95\x96\x97\x98\x99\x9a\x9b\x9c\x9d\x9e\x9f\xa0\xa1\xa2\xa3\xa4\xa5\xa6\xa7\xa8\xa9\xaa\xab\xac\xad\xae\xaf\xb0\xb1\xb2\xb3\xb4\xb5\xb6\xb7\xb8\xb9\xba\xbb\xbc\xbd\xbe\xbf\xc0\xc1\xc2\xc3\xc4\xc5\xc6\xc7\xc8\xc9\xca\xcb\xcc\xcd\xce\xcf\xd0\xd1\xd2\xd3\xd4\xd5\xd6\xd7\xd8\xd9\xda\xdb\xdc\xdd\xde\xdf\xe0\xe1\xe2\xe3\xe4\xe5\xe6\xe7\xe8\xe9\xea\xeb\xec\xed\xee\xef\xf0\xf1\xf2\xf3\xf4\xf5\xf6\xf7\xf8\xf9\xfa\xfb\xfc\xfd\xfe\xff";
    this.libHash_HexTable = new Array(16);

    this.libHash_HashInputSize = 0;
    console.log('LibHash initialized.');
  }

  public libHash_GetHashInputLittleEndianInt(position: number): number {
    position *= 4;
    let result: number = this.libHash_HashInputData[position];
    let temp: number = this.libHash_HashInputData[position + 1];
    result |= temp << 8;
    temp = this.libHash_HashInputData[position + 2];
    result |= temp << 16;
    temp = this.libHash_HashInputData[position + 3];
    result |= temp << 24;
    return result;
  }

  public libHash_GetHashInputBigEndianInt(position: number): number {
    position *= 4;
    let temp: number = this.libHash_HashInputData[position];
    let result: number = temp << 24;
    temp = this.libHash_HashInputData[position + 1];
    result |= temp << 16;
    temp = this.libHash_HashInputData[position + 2];
    result |= temp << 8;
    temp = this.libHash_HashInputData[position + 3];
    result |= temp;
    return result;
  }

  public libHash_CharToAsciiCode(charContainingString: string, charPosition: number): number {
    return this.libHash_asciiTable.indexOf(charContainingString.charAt(charPosition));
  }

  public libHash_GetHexChar(number: number): string {
    return this.libHash_HexTable[number];
  }

  public libHash_GetUnsignedLittleEndianHexRepresentation(unsignedInt: number): string {
    let representation: string = "";
    representation += this.libHash_GetHexChar((unsignedInt & 0x000000F0) >> 4);
    representation += this.libHash_GetHexChar((unsignedInt & 0x0000000F));
    representation += this.libHash_GetHexChar((unsignedInt & 0x0000F000) >> 12);
    representation += this.libHash_GetHexChar((unsignedInt & 0x00000F00) >> 8);
    representation += this.libHash_GetHexChar((unsignedInt & 0x00F00000) >> 20);
    representation += this.libHash_GetHexChar((unsignedInt & 0x000F0000) >> 16);
    if (unsignedInt >= 0) {
      representation += this.libHash_GetHexChar(unsignedInt >> 28);
    } else {
      unsignedInt += 0x7FFFFFFF + 1;
      representation += this.libHash_GetHexChar(0x8 + (unsignedInt >> 28));
    }
    representation += this.libHash_GetHexChar((unsignedInt & 0x0F000000) >> 24);
    return representation;
  }

  public libHash_GetUnsignedHexRepresentation(unsignedInt: number): string {
    let representation: string = "";
    if (unsignedInt >= 0) {
      representation += this.libHash_GetHexChar(unsignedInt >> 28);
    } else {
      unsignedInt += 0x7FFFFFFF + 1;
      representation += this.libHash_GetHexChar(0x8 + (unsignedInt >> 28));
    }
    representation += this.libHash_GetHexChar((unsignedInt & 0x0F000000) >> 24);
    representation += this.libHash_GetHexChar((unsignedInt & 0x00F00000) >> 20);
    representation += this.libHash_GetHexChar((unsignedInt & 0x000F0000) >> 16);
    representation += this.libHash_GetHexChar((unsignedInt & 0x0000F000) >> 12);
    representation += this.libHash_GetHexChar((unsignedInt & 0x00000F00) >> 8);
    representation += this.libHash_GetHexChar((unsignedInt & 0x000000F0) >> 4);
    representation += this.libHash_GetHexChar((unsignedInt & 0x0000000F));
    return representation;
  }

  public libHash_GetFixedDataAsInt(fixedVar: number): number {
    let data: number;
    data = (Math.floor(fixedVar) << 12); // Math.floor - FixedToInt
    fixedVar -= data;
    data |= Math.floor(fixedVar * sc2_Pow(12, 2));
    return data;
  }

  public libHash_UnsignedRightShift(input: number, shift: number): number {
    return input >>> shift;
  }

  public libHash_UnsignedLeftRotate(input: number, rotation: number): number {
    rotation = sc2_ModI(rotation, 32); // ModI
    return (input << rotation) | this.libHash_UnsignedRightShift(input, 32 - rotation);
  }

  public libHash_UnsignedRightRotate(input: number, rotation: number): number {
    rotation = sc2_ModI(rotation, 32); // ModI
    return this.libHash_UnsignedRightShift(input, rotation) | (input << (32 - rotation));
  }

  public libHash_UnsignedLeftRotate32(input: number, rotation: number): number {
    return (input << rotation) | this.libHash_UnsignedRightShift(input, 32 - rotation);
  }

  public libHash_UnsignedRightRotate32(input: number, rotation: number): number {
    return this.libHash_UnsignedRightShift(input, rotation) | (input << (32 - rotation));
  }

  //--------------------------------------------------------------------------------------------------
  // Custom Script: MD5 Script
  //--------------------------------------------------------------------------------------------------
  public libHash_Md5F(b: number, c: number, d: number): number {
    return d ^ (b & (c ^ d));
  }

  public libHash_Md5G(b: number, c: number, d: number): number {
    return c ^ (d & (b ^ c));
  }

  public libHash_Md5H(b: number, c: number, d: number): number {
    return b ^ c ^ d;
  }

  public libHash_Md5I(b: number, c: number, d: number): number {
    return c ^ (b | (~d));
  }

  public libHash_Md5FF(a: number, b: number, c: number, d: number, w: number, r: number, k: number): number {
    return this.libHash_UnsignedLeftRotate32((a + this.libHash_Md5F(b, c, d) + k + w), r) + b;
  }

  public libHash_Md5GG(a: number, b: number, c: number, d: number, w: number, r: number, k: number): number {
    return this.libHash_UnsignedLeftRotate32((a + this.libHash_Md5G(b, c, d) + k + w), r) + b;
  }

  public libHash_Md5HH(a: number, b: number, c: number, d: number, w: number, r: number, k: number): number {
    return this.libHash_UnsignedLeftRotate32((a + this.libHash_Md5H(b, c, d) + k + w), r) + b;
  }

  public libHash_Md5II(a: number, b: number, c: number, d: number, w: number, r: number, k: number): number {
    return this.libHash_UnsignedLeftRotate32((a + this.libHash_Md5I(b, c, d) + k + w), r) + b;
  }

  public libHash_GenerateMd5HashCode(): string {
    let h0: number = 0x67452301;
    let h1: number = 0x0E000000 << 4 | 0x0FCDAB89;
    let h2: number = 0x09000000 << 4 | 0x08BADCFE;
    let h3: number = 0x10325476;
    let a: number;
    let b: number;
    let c: number;
    let d: number;
    let i: number = 0;
    let j: number = 0;
    let messageNBits: number;
    let paddingLength: number;
    //  Prepare message
    messageNBits = this.libHash_HashInputSize * 8;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0x80;
    this.libHash_HashInputSize += 1;
    paddingLength = 56 - (this.libHash_HashInputSize % 64);
    if (paddingLength < 0) {
      paddingLength += 64;
    }
    while (i < paddingLength) {
      this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
      this.libHash_HashInputSize += 1;
      i += 1;
    }
    //Note: You might want to change this when the hash input increases in size.
    this.libHash_HashInputData[this.libHash_HashInputSize] = messageNBits;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = messageNBits >> 8;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    //  Loop
    i = 0;
    while (i < (this.libHash_HashInputSize - 1)) {
      a = h0;
      b = h1;
      c = h2;
      d = h3;
      a = this.libHash_Md5FF(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j), 7, 0x0d000000 << 4 | 0x076aa478);
      d = this.libHash_Md5FF(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 1), 12, 0x0e000000 << 4 | 0x08c7b756);
      c = this.libHash_Md5FF(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 2), 17, 0x242070db);
      b = this.libHash_Md5FF(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 3), 22, 0x0c000000 << 4 | 0x01bdceee);
      a = this.libHash_Md5FF(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 4), 7, 0x0f000000 << 4 | 0x057c0faf);
      d = this.libHash_Md5FF(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 5), 12, 0x4787c62a);
      c = this.libHash_Md5FF(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 6), 17, 0x0a000000 << 4 | 0x08304613);
      b = this.libHash_Md5FF(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 7), 22, 0x0f000000 << 4 | 0x0d469501);
      a = this.libHash_Md5FF(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 8), 7, 0x698098d8);
      d = this.libHash_Md5FF(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 9), 12, 0x08000000 << 4 | 0x0b44f7af);
      c = this.libHash_Md5FF(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 10), 17, 0x0f000000 << 4 | 0x0fff5bb1);
      b = this.libHash_Md5FF(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 11), 22, 0x08000000 << 4 | 0x095cd7be);
      a = this.libHash_Md5FF(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 12), 7, 0x6b901122);
      d = this.libHash_Md5FF(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 13), 12, 0x0f000000 << 4 | 0x0d987193);
      c = this.libHash_Md5FF(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 14), 17, 0x0a000000 << 4 | 0x0679438e);
      b = this.libHash_Md5FF(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 15), 22, 0x49b40821);
      a = this.libHash_Md5GG(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 1), 5, 0x0f000000 << 4 | 0x061e2562);
      d = this.libHash_Md5GG(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 6), 9, 0x0c000000 << 4 | 0x0040b340);
      c = this.libHash_Md5GG(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 11), 14, 0x265e5a51);
      b = this.libHash_Md5GG(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j), 20, 0x0e000000 << 4 | 0x09b6c7aa);
      a = this.libHash_Md5GG(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 5), 5, 0x0d000000 << 4 | 0x062f105d);
      d = this.libHash_Md5GG(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 10), 9, 0x02441453);
      c = this.libHash_Md5GG(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 15), 14, 0x0d000000 << 4 | 0x08a1e681);
      b = this.libHash_Md5GG(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 4), 20, 0x0e000000 << 4 | 0x07d3fbc8);
      a = this.libHash_Md5GG(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 9), 5, 0x21e1cde6);
      d = this.libHash_Md5GG(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 14), 9, 0x0c000000 << 4 | 0x033707d6);
      c = this.libHash_Md5GG(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 3), 14, 0x0f000000 << 4 | 0x04d50d87);
      b = this.libHash_Md5GG(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 8), 20, 0x455a14ed);
      a = this.libHash_Md5GG(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 13), 5, 0x0a000000 << 4 | 0x09e3e905);
      d = this.libHash_Md5GG(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 2), 9, 0x0f000000 << 4 | 0x0cefa3f8);
      c = this.libHash_Md5GG(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 7), 14, 0x676f02d9);
      b = this.libHash_Md5GG(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 12), 20, 0x08000000 << 4 | 0x0d2a4c8a);
      a = this.libHash_Md5HH(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 5), 4, 0x0f000000 << 4 | 0x0ffa3942);
      d = this.libHash_Md5HH(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 8), 11, 0x08000000 << 4 | 0x0771f681);
      c = this.libHash_Md5HH(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 11), 16, 0x6d9d6122);
      b = this.libHash_Md5HH(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 14), 23, 0x0f000000 << 4 | 0x0de5380c);
      a = this.libHash_Md5HH(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 1), 4, 0x0a000000 << 4 | 0x04beea44);
      d = this.libHash_Md5HH(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 4), 11, 0x4bdecfa9);
      c = this.libHash_Md5HH(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 7), 16, 0x0f000000 << 4 | 0x06bb4b60);
      b = this.libHash_Md5HH(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 10), 23, 0x0b000000 << 4 | 0x0ebfbc70);
      a = this.libHash_Md5HH(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 13), 4, 0x289b7ec6);
      d = this.libHash_Md5HH(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 0), 11, 0x0e000000 << 4 | 0x0aa127fa);
      c = this.libHash_Md5HH(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 3), 16, 0x0d000000 << 4 | 0x04ef3085);
      b = this.libHash_Md5HH(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 6), 23, 0x04881d05);
      a = this.libHash_Md5HH(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 9), 4, 0x0d000000 << 4 | 0x09d4d039);
      d = this.libHash_Md5HH(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 12), 11, 0x0e000000 << 4 | 0x06db99e5);
      c = this.libHash_Md5HH(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 15), 16, 0x1fa27cf8);
      b = this.libHash_Md5HH(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 2), 23, 0x0c000000 << 4 | 0x04ac5665);
      a = this.libHash_Md5II(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j), 6, 0x0f000000 << 4 | 0x04292244);
      d = this.libHash_Md5II(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 7), 10, 0x432aff97);
      c = this.libHash_Md5II(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 14), 15, 0x0a000000 << 4 | 0x0b9423a7);
      b = this.libHash_Md5II(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 5), 21, 0x0f000000 << 4 | 0x0c93a039);
      a = this.libHash_Md5II(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 12), 6, 0x655b59c3);
      d = this.libHash_Md5II(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 3), 10, 0x08000000 << 4 | 0x0f0ccc92);
      c = this.libHash_Md5II(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 10), 15, 0x0f000000 << 4 | 0x0feff47d);
      b = this.libHash_Md5II(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 1), 21, 0x08000000 << 4 | 0x05845dd1);
      a = this.libHash_Md5II(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 8), 6, 0x6fa87e4f);
      d = this.libHash_Md5II(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 15), 10, 0x0f000000 << 4 | 0x0e2ce6e0);
      c = this.libHash_Md5II(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 6), 15, 0x0a000000 << 4 | 0x03014314);
      b = this.libHash_Md5II(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 13), 21, 0x4e0811a1);
      a = this.libHash_Md5II(a, b, c, d, this.libHash_GetHashInputLittleEndianInt(j + 4), 6, 0x0f000000 << 4 | 0x07537e82);
      d = this.libHash_Md5II(d, a, b, c, this.libHash_GetHashInputLittleEndianInt(j + 11), 10, 0x0b000000 << 4 | 0x0d3af235);
      c = this.libHash_Md5II(c, d, a, b, this.libHash_GetHashInputLittleEndianInt(j + 2), 15, 0x2ad7d2bb);
      b = this.libHash_Md5II(b, c, d, a, this.libHash_GetHashInputLittleEndianInt(j + 9), 21, 0x0e000000 << 4 | 0x0b86d391);
      h0 += a;
      h1 += b;
      h2 += c;
      h3 += d;
      i += 64;
      j += 16;
    }

    return this.libHash_GetUnsignedLittleEndianHexRepresentation(h0) + this.libHash_GetUnsignedLittleEndianHexRepresentation(h1) + this.libHash_GetUnsignedLittleEndianHexRepresentation(h2) + this.libHash_GetUnsignedLittleEndianHexRepresentation(h3);
  }

  //--------------------------------------------------------------------------------------------------
  // Custom Script: SHA256 Script
  //--------------------------------------------------------------------------------------------------
  public libHash_Sha256Ch(x: number, y: number, z: number): number {
    return (x & y) ^ (~x & z);
  }

  public libHash_Sha256Maj(x: number, y: number, z: number): number {
    return (x & y) ^ (x & z) ^ (y & z);
  }

  public libHash_Sha256CapitalSigma0(x: number): number {
    return this.libHash_UnsignedRightRotate32(x, 2) ^ this.libHash_UnsignedRightRotate32(x, 13) ^ this.libHash_UnsignedRightRotate32(x, 22);
  }

  public libHash_Sha256CapitalSigma1(x: number): number {
    return this.libHash_UnsignedRightRotate32(x, 6) ^ this.libHash_UnsignedRightRotate32(x, 11) ^ this.libHash_UnsignedRightRotate32(x, 25);
  }

  public libHash_Sha256Sigma0(x: number): number {
    return this.libHash_UnsignedRightRotate32(x, 7) ^ this.libHash_UnsignedRightRotate32(x, 18) ^ this.libHash_UnsignedRightShift(x, 3);
  }

  public libHash_Sha256Sigma1(x: number): number {
    return this.libHash_UnsignedRightRotate32(x, 17) ^ this.libHash_UnsignedRightRotate32(x, 19) ^ this.libHash_UnsignedRightShift(x, 10);
  }

  public libHash_Sha256T0(e: number, f: number, g: number, h: number, k: number, w: number): number {
    return h + this.libHash_Sha256CapitalSigma1(e) + this.libHash_Sha256Ch(e, f, g) + k + w;
  }

  public libHash_Sha256T1(a: number, b: number, c: number): number {
    return this.libHash_Sha256CapitalSigma0(a) + this.libHash_Sha256Maj(a, b, c);
  }

  public libHash_GenerateSha256HashCode(): string {
    let h0: number = 0x6a09e667;
    let h1: number = (0x0b000000 << 4) | 0x0b67ae85;
    let h2: number = 0x3c6ef372;
    let h3: number = (0x0a000000 << 4) | 0x054ff53a;
    let h4: number = 0x510e527f;
    let h5: number = (0x09000000 << 4) | 0x0b05688c;
    let h6: number = 0x1f83d9ab;
    let h7: number = 0x5be0cd19;
    let a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, t0: number, t1: number;
    let w: number[] = new Array(64);
    let i: number = 0, j: number = 0, k: number = 0;
    let messageNBits: number;
    let paddingLength: number;
    //  Prepare message
    messageNBits = this.libHash_HashInputSize * 8;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0x80;
    this.libHash_HashInputSize += 1;
    paddingLength = 56 - (this.libHash_HashInputSize % 64);
    if (paddingLength < 0) {
      paddingLength += 64;
    }
    while (i < paddingLength) {
      this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
      this.libHash_HashInputSize += 1;
      i += 1;
    }
    //Note: You might want to change this when the hash input increases in size.
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = 0;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = messageNBits >> 8;
    this.libHash_HashInputSize += 1;
    this.libHash_HashInputData[this.libHash_HashInputSize] = messageNBits;
    this.libHash_HashInputSize += 1;
    //  Loop
    i = 0;
    while (i < (this.libHash_HashInputSize - 1)) {
      //  Working Variables
      a = h0;
      b = h1;
      c = h2;
      d = h3;
      e = h4;
      f = h5;
      g = h6;
      h = h7;
      //  Preparing Extra Message Schedule
      j = 0;
      while (j < 16) {
        w[j] = this.libHash_GetHashInputBigEndianInt(k);
        j += 1;
        k += 1;
      }
      while (j < 64) {
        w[j] = this.libHash_Sha256Sigma1(w[j - 2]) +
          w[j - 7] +
          this.libHash_Sha256Sigma0(w[j - 15]) +
          w[j - 16];
        j += 1;
      }
      // Calculate hash values
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x428a2f98, w[0]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0; i += 1;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x71374491, w[1]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0; i += 1;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x0b000000 << 4 | 0x05c0fbcf, w[2]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0; i += 1;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x0e000000 << 4 | 0x09b5dba5, w[3]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0; i += 1;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x3956c25b, w[4]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0; i += 1;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x59f111f1, w[5]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0; i += 1;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x09000000 << 4 | 0x023f82a4, w[6]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0; i += 1;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x0a000000 << 4 | 0x0b1c5ed5, w[7]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0; i += 1;
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x0d000000 << 4 | 0x0807aa98, w[8]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0; i += 1;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x12835b01, w[9]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0; i += 1;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x243185be, w[10]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0; i += 1;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x550c7dc3, w[11]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0; i += 1;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x72be5d74, w[12]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0; i += 1;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x08000000 << 4 | 0x00deb1fe, w[13]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0; i += 1;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x09000000 << 4 | 0x0bdc06a7, w[14]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0; i += 1;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x0c000000 << 4 | 0x019bf174, w[15]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      // 16 to 31
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x0e000000 << 4 | 0x049b69c1, w[16]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x0e000000 << 4 | 0x0fbe4786, w[17]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x0fc19dc6, w[18]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x240ca1cc, w[19]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x2de92c6f, w[20]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x4a7484aa, w[21]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x5cb0a9dc, w[22]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x76f988da, w[23]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x09000000 << 4 | 0x083e5152, w[24]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x0a000000 << 4 | 0x0831c66d, w[25]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x0b000000 << 4 | 0x000327c8, w[26]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x0b000000 << 4 | 0x0f597fc7, w[27]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x0c000000 << 4 | 0x06e00bf3, w[28]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x0d000000 << 4 | 0x05a79147, w[29]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x06ca6351, w[30]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x14292967, w[31]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      // 32 to 47
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x27b70a85, w[32]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x2e1b2138, w[33]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x4d2c6dfc, w[34]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x53380d13, w[35]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x650a7354, w[36]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x766a0abb, w[37]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x08000000 << 4 | 0x01c2c92e, w[38]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x09000000 << 4 | 0x02722c85, w[39]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x0a000000 << 4 | 0x02bfe8a1, w[40]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x0a000000 << 4 | 0x081a664b, w[41]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x0c000000 << 4 | 0x024b8b70, w[42]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x0c000000 << 4 | 0x076c51a3, w[43]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x0d000000 << 4 | 0x0192e819, w[44]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x0d000000 << 4 | 0x06990624, w[45]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x0f000000 << 4 | 0x040e3585, w[46]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x106aa070, w[47]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      // 48 to 63
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x19a4c116, w[48]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x1e376c08, w[49]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x2748774c, w[50]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x34b0bcb5, w[51]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x391c0cb3, w[52]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x4ed8aa4a, w[53]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x5b9cca4f, w[54]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x682e6ff3, w[55]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      t0 = this.libHash_Sha256T0(e, f, g, h, 0x748f82ee, w[56]); t1 = this.libHash_Sha256T1(a, b, c);
      h = t0 + t1; d += t0;
      t0 = this.libHash_Sha256T0(d, e, f, g, 0x78a5636f, w[57]); t1 = this.libHash_Sha256T1(h, a, b);
      g = t0 + t1; c += t0;
      t0 = this.libHash_Sha256T0(c, d, e, f, 0x08000000 << 4 | 0x04c87814, w[58]); t1 = this.libHash_Sha256T1(g, h, a);
      f = t0 + t1; b += t0;
      t0 = this.libHash_Sha256T0(b, c, d, e, 0x08000000 << 4 | 0x0cc70208, w[59]); t1 = this.libHash_Sha256T1(f, g, h);
      e = t0 + t1; a += t0;
      t0 = this.libHash_Sha256T0(a, b, c, d, 0x09000000 << 4 | 0x00befffa, w[60]); t1 = this.libHash_Sha256T1(e, f, g);
      d = t0 + t1; h += t0;
      t0 = this.libHash_Sha256T0(h, a, b, c, 0x0a000000 << 4 | 0x04506ceb, w[61]); t1 = this.libHash_Sha256T1(d, e, f);
      c = t0 + t1; g += t0;
      t0 = this.libHash_Sha256T0(g, h, a, b, 0x0b000000 << 4 | 0x0ef9a3f7, w[62]); t1 = this.libHash_Sha256T1(c, d, e);
      b = t0 + t1; f += t0;
      t0 = this.libHash_Sha256T0(f, g, h, a, 0x0c000000 << 4 | 0x067178f2, w[63]); t1 = this.libHash_Sha256T1(b, c, d);
      a = t0 + t1; e += t0;
      h0 += a;
      h1 += b;
      h2 += c;
      h3 += d;
      h4 += e;
      h5 += f;
      h6 += g;
      h7 += h;
      i += 49;
    }

    return this.libHash_GetUnsignedHexRepresentation(h0) +
      this.libHash_GetUnsignedHexRepresentation(h1) +
      this.libHash_GetUnsignedHexRepresentation(h2) +
      this.libHash_GetUnsignedHexRepresentation(h3) +
      this.libHash_GetUnsignedHexRepresentation(h4) +
      this.libHash_GetUnsignedHexRepresentation(h5) +
      this.libHash_GetUnsignedHexRepresentation(h6) +
      this.libHash_GetUnsignedHexRepresentation(h7);
  }

  public libHash_InitializeHashInput(): void {
    this.libHash_HashInputSize = 0;
    if (this.libHash_HexTable[0] == "") {
      this.libHash_HexTable[0] = "0"; this.libHash_HexTable[1] = "1"; this.libHash_HexTable[2] = "2"; this.libHash_HexTable[3] = "3";
      this.libHash_HexTable[4] = "4"; this.libHash_HexTable[5] = "5"; this.libHash_HexTable[6] = "6"; this.libHash_HexTable[7] = "7";
      this.libHash_HexTable[8] = "8"; this.libHash_HexTable[9] = "9"; this.libHash_HexTable[10] = "a"; this.libHash_HexTable[11] = "b";
      this.libHash_HexTable[12] = "c"; this.libHash_HexTable[13] = "d"; this.libHash_HexTable[14] = "e"; this.libHash_HexTable[15] = "f";
    }
  }

  public libHash_AddByteToHashInput(lp_byte: number): void {
    this.libHash_HashInputData[this.libHash_HashInputSize] = lp_byte;
    this.libHash_HashInputSize += 1;
  }

  public libHash_AddIntegerToHashInput(lp_integer: number): void {
    this.libHash_AddByteToHashInput(lp_integer);
    this.libHash_AddByteToHashInput(lp_integer >> 8);
    this.libHash_AddByteToHashInput(lp_integer >> 16);
    this.libHash_AddByteToHashInput(lp_integer >> 24);
  }

  public libHash_AddRealToHashInput(lp_real: number): void {
    this.libHash_AddIntegerToHashInput(this.libHash_GetFixedDataAsInt(lp_real));
  }

  public libHash_AddStringToHashInput(lp_string: string): void {
    for (let i = 0; i < lp_string.length; i++)
      this.libHash_AddByteToHashInput(this.libHash_CharToAsciiCode(lp_string, i));
  }

  public libHash_InitLib(): void {
    this.libHash_InitializeHashInput();
  }
}

export default new LibHash();