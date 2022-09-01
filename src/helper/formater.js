export const getElipseText = (wallet) => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
}