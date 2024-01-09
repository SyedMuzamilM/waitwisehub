import UAParser from 'ua-parser-js'

export const parseUserAgent = (agent: string) => {
    const parser = new UAParser(agent)
    const result = parser.getResult()
    
    const device = result.device.model || 'Unknown Device'
    const os = result.os.name || 'Unknown OS'
    const browser = result.browser.name || 'Unknow Browser'

    return {
        device,
        os,
        browser
    }
}