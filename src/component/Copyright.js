import React from 'react'
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => {
    return (
      <Typography variant="body2" style={{color:'#ffffff'}} align="center" gutterBottom>
        {'Copyright © '}
        <Link style={{color:'#ffffff'}} href="#">
          OFPPT
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  export default Copyright