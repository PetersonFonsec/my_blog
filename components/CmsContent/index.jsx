
function CmsContent(content){

  function define({content}){
    switch (content.type) {
      case 'heading1':
        return <h1>{content.text}</h1>
     
      case 'paragraph':
        return <p>{content.text}</p>
      default:
        return <p>{content.text}</p>
    }
  }

  return define(content)
}

export default CmsContent;