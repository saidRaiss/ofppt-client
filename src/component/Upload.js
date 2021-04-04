import React, { useState } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Typography, Button, ListItem, withStyles } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [currentFile, setCurrentFile] = useState(null)
  const [progress, setProgress] = useState(25)
  const [message, setmessage] = useState("")
  const [fileInfos, setfileInfos] = useState()
  const [isError, setIsError] = useState(false)
    
    return (
      <div className="mg20">
        {currentFile && (
          <Box className="mb25" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }

        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={()=>{}} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choose Files
          </Button>
        </label>
        <div className="file-name">
        {selectedFiles && selectedFiles.length > 0 ? selectedFiles[0].name : null}
        </div>
        <Button
          className="btn-upload"
          color="primary"
          variant="contained"
          component="span"
          disabled={!selectedFiles}
          onClick={()=>{}}>
          Upload
        </Button>

        <Typography variant="subtitle2" className={`upload-message ${isError ? "error" : ""}`}>
          {message}
        </Typography>

        <Typography variant="h6" className="list-header">
          List of Files
          </Typography>
        <ul className="list-group">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <ListItem
                divider
                key={index}>
                <a href={file.url}>{file.name}</a>
              </ListItem>
            ))}
        </ul>
      </div >
    )
}
export default Upload