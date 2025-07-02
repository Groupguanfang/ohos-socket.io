import { PACKET_TYPES, Packet, RawData,BufferSource } from "./commons.js";
import { encode } from "./contrib/base64-arraybuffer"

export const encodePacket = (
  { type, data }: Packet,
  supportsBinary: boolean,
  callback: (encodedPacket: RawData) => void,
) => {
  if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
    return callback(
      supportsBinary ? data : "b" + encode(toBuffer(data, true)),
    );
  }
  // plain string
  return callback(PACKET_TYPES[type] + (data || ""));
};

const toBuffer = (data: BufferSource, forceBufferConversion: boolean) => {
  if ((data instanceof Uint8Array && !forceBufferConversion)) {
    return data;
  } else if (data instanceof ArrayBuffer) {
    let uint8Array = new Uint8Array(data);
    return uint8Array;
  }
};

let TEXT_ENCODER;

export function encodePacketToBinary(
  packet: Packet,
  callback: (encodedPacket: RawData) => void,
) {
  if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
    return callback(toBuffer(packet.data, false));
  }
  encodePacket(packet, true, (encoded) => {
    if (!TEXT_ENCODER) {
      // lazily created for compatibility with Node.js 10
      //TEXT_ENCODER = new TextEncoder();
    }
    callback(TEXT_ENCODER.encode(encoded));
  });
}
