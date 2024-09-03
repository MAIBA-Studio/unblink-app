/**
 * Used to return the short version of a given address.
 * Example: 6PaL5Bk2ojvSKFWuaGd3oJoeK94Dn74d3ooanEhCtoSB => 6PaL5...toSB
 *
 * @param address Address to be shortened (not type-checked)
 * @param chars Amount of characters per side of the ellipsis
 * @returns A shortened version of a provided address
 */
export function shortenAddress(address: string, chars = 4): string {
  return !!address
    ? `${address.slice(0, chars)}...${address.slice(-chars)}`
    : "";
}
