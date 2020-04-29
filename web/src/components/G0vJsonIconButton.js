import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe';
import { useTranslation } from 'react-i18next';

import GithubLinkButton from './GithubLinkButton';

const useStyles = makeStyles((theme) => ({
  iframe: {
    width: 500,
    height: 450,
    border: 'none',
    marginBottom: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function G0vJsonIconButton({ url, repo, className }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const size = 'small';
  const title = url ? t('g0vJson.helpEdit') : t('g0vJson.helpAdd');

  const params = [
    `repo=${repo}`,
    'hideHeader=1',
    'autoLogin=1',
  ];

  const iframeUrl = `https://g0v.github.io/editor?${params.join('&')}`;

  return (
    <React.Fragment>
      <Tooltip title={title}>
        <IconButton
          className={className}
          aria-label={title}
          size={size}
          onClick={()=>setOpen(true)}
        >
          { url ? <EditIcon /> : <AddIcon />}
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onBackdropClick={()=>{}}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="customized-dialog-title">
          {t('g0vJson.editor')} <GithubLinkButton url="https://github.com/g0v/editor"/>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={()=>setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Iframe
            url={iframeUrl}
            width="500px"
            className={classes.iframe}
            display="initial"
            position="relative"
          />
        </DialogContent>
      </Dialog>

    </React.Fragment>
  );
}

G0vJsonIconButton.propTypes = {
  url: PropTypes.string,
  repo: PropTypes.string,
  className: PropTypes.string,
};

export default G0vJsonIconButton;
