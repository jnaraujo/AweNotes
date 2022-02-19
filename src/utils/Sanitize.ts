import sanitizeHtml from 'sanitize-html';


export default function Sanitize(html: string){
    return sanitizeHtml(html, {
        allowedTags: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', "br"]
    })
}