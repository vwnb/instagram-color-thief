# instagram-color-thief
Instagram CLI for Lokesh Dhakar's color-thief

## How to use
### Preparations
1. Make sure you have NodeJS version 8 or above
2. Clone the repository
3. Download your Instagram data from the "Privacy and Security" tab
4. Replace the contents of `instagram-color-thief/userdata` with the contents of what you got from Instagram (just `photos` and `media.json` is enough)
5. `npm install` inside the repository

### Usage
Call the Node program. The rows are always sorted by dates.
- With default parameters: `node ig-palettes.js` (Format: CSV, Dates: Yes, Captions: Yes)
- To get output without dates, add `--dates=false`
- To get output without captions, add `--captions=false`
- To get output in JSON, add `--format=JSON`
