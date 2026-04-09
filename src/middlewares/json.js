export async function json(req, res) {
    const {method, url} = req

    const buffers = []

    for await(const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.fullStreamContent = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.fullStreamContent = null
    }

    res.setHeader("Content-Type", "application/json")
}