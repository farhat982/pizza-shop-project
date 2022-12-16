import cookie from 'cookie'

const handler = (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body
    if (
      username === 'admin' &&
      password === '123456'
    ) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', 'SWDw4Cv||663Zp3|zxtp%ok6Ejj', {
          maxAge: 60 * 60,
          sameSite: 'strict',
          path: '/',
        })
      )
      res.status(200).json('Successfull')
    } else {
      res.status(400).json('Invlid username or password')
    }
  }
}

export default handler
