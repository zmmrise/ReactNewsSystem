import React, {useEffect, useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import {ContentState, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './NewsEditor.css'
export default function NewsEditor(props) {
  const [editorState, setEditorState] = useState("")
  useEffect(() => {
    const html = props.editorContent
    if (html === undefined) {
      return
    }
    const contentBlock = htmlToDraft(html)
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      setEditorState(editorState)
    }
  }, [props])
  return (
    <div><Editor
    editorState={editorState}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
    onEditorStateChange={(editorState) => setEditorState(editorState)}
    onBlur={() => props.getNewsEditorContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))}
  /></div>
  )
}
 