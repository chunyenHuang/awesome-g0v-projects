import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  input: {
    padding: '10px 14px',
  },
}));

const languages = [{
  value: 'zh-TW',
  title: '中文',
  isDefault: true,
}, {
  value: 'en-US',
  title: 'English',
}];

const LanguageSelector = () => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const [currentValue, setCurrentValue] = useState(languages[0].value);

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setCurrentValue(event.target.value);
    window.localStorage.setItem('language', event.target.value);
  };

  useEffect(() => {
    const cache = window.localStorage.getItem('language');
    if (cache) {
      setCurrentValue(cache);
      i18n.changeLanguage(cache);
    }
  }, [i18n]);

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        labelId="translation"
        id="translation"
        value={currentValue}
        onChange={handleChange}
        label="Language"
        size="small"
        input={<OutlinedInput classes={{ input: classes.input }} />}
      >
        {languages.map(({ value, title }) => (
          <MenuItem key={value} value={value}>{title}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
