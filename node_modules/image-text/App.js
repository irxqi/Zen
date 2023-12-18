var axios = require('axios'),
fs = require('fs');
module.exports = async (text,font,size) => {
var data = await axios.get(`https://fakeimg.pl/${size||'440x230'}/282828/eae0d0/?text=${text||'Nothing'}&font=${font||'monospace'}`, {responseType: 'arraybuffer'})
fs.writeFileSync('./placeholder.png', data.data, (err) => {
if (err) throw err;
})
}