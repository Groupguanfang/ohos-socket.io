import { encodePacket, encodePacketToBinary } from "./encodePacket.js";
import { decodePacket } from "./decodePacket.js";
import {
  Packet,
  PacketType,
  RawData,
  BinaryType,
  ERROR_PACKET,
} from "./commons.js";
// we can't import TransformStream as a value because it was added in Node.js v16.5.0, so it would break on older Node.js versions
// reference: https://nodejs.org/api/webstreams.html#class-transformstream
//import type { TransformStream } from "node:stream/web";

const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

const encodePayload = (
  packets: Packet[],
  callback: (encodedPayload: string) => void,
) => {
  // some packets may be added to the array while encoding, so the initial length must be saved
  const length = packets.length;
  const encodedPackets = new Array(length);
  let count = 0;

  packets.forEach((packet, i) => {
    // force base64 encoding for binary packets
    encodePacket(packet, false, (encodedPacket) => {
      encodedPackets[i] = encodedPacket;
      if (++count === length) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};

const decodePayload = (
  encodedPayload: string,
  binaryType?: BinaryType,
): Packet[] => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i = 0; i < encodedPackets.length; i++) {
    const decodedPacket = decodePacket(encodedPackets[i], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};

export function createPacketEncoderStream() {

}

let TEXT_DECODER;

function totalLength(chunks: Uint8Array[]) {
  return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}

function concatChunks(chunks: Uint8Array[], size: number) {
  if (chunks[0].length === size) {
    return chunks.shift();
  }
  const buffer = new Uint8Array(size);
  let j = 0;
  for (let i = 0; i < size; i++) {
    buffer[i] = chunks[0][j++];
    if (j === chunks[0].length) {
      chunks.shift();
      j = 0;
    }
  }
  if (chunks.length && j < chunks[0].length) {
    chunks[0] = chunks[0].slice(j);
  }
  return buffer;
}

const enum State {
  READ_HEADER,
  READ_EXTENDED_LENGTH_16,
  READ_EXTENDED_LENGTH_64,
  READ_PAYLOAD,
}

export function createPacketDecoderStream(
  maxPayload: number,
  binaryType: BinaryType,
) {
}

export const protocol = 4;
export {
  encodePacket,
  encodePayload,
  decodePacket,
  decodePayload,
  type Packet,
  type PacketType,
  type RawData,
  type BinaryType,
};
