const http = require('http');
const mammoth = require("mammoth");
var options = {
    styleMap: [
        "b => em",
        "i => strong",
        "u => em",
        "strike => del",
        "comment-reference => sup",
        "p[style-name='Heading 1'] => h1"
    ],
    transformDocument: mammoth.transforms.paragraph(transformParagraph)
};

function transformParagraph(element) {
    if (element.alignment === "center" && !element.styleId) {
        element.styleId = "Heading6";
    }
    return element;
}

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  mammoth.convertToHtml({path: "document2.docx"}, options)
  .then(function(result) {
    var html = result.value; // The generated HTML
    res.end(html)
    console.log(html);
  })
  .done();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});