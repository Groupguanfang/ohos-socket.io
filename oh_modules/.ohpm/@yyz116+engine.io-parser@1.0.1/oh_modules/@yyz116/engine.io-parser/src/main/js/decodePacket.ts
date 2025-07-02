import {
  ERROR_PACKET,
  PACKET_TYPES_REVERSE,
  Packet,
  BinaryType,
  RawData,
} from "./commons.js";

export const decodePacket = (
  encodedPacket: RawData,
  binaryType?: BinaryType,
): Packet => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType),
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return ERROR_PACKET;
  }
  if (!PACKET_TYPES_REVERSE[type]) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1
    ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1),
      }
    : {
        type: PACKET_TYPES_REVERSE[type],
      };
};

const mapBinary = (data: RawData, binaryType?: BinaryType) => {
  switch (binaryType) {
    case "arraybuffer":
      if (data instanceof ArrayBuffer) {
        // from WebSocket & binaryType "arraybuffer"
        return data;
      } else {
        // from WebTransport (Uint8Array)
      }
    case "nodebuffer":
    default:
      return data;
  }
};
