const path = require('path')

module.exports = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}
