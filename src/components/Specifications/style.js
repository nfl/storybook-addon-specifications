import {StyleSheet} from "aphrodite";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: 'rgb(68, 68, 68)',
    fontSize: 12,
    letterSpacing: 1,
    textDecoration: 'none',
    margin: '2em',
    paddingLeft: '1em'
  },

  childrenWrapper: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.02)',
    marginLeft: '1em',
    paddingLeft: '1em',
    transition: 'border 0.25s ease-in-out',

    ':hover': {
        borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
    }
  },

  skipped: {
    color: 'darkcyan',

    ':before': {
      content: "'-'",
      padding: '3px 5px',
      float: 'left',
      marginTop: '-2px'
    }
  },

  error: {
    ':before': {
      content: "'✘'",
      padding: '3px 5px',
      backgroundColor: 'red'
    }
  },

  list: {
    margin: '1em 1em 2em',
    padding: 0,
    listStyleType: 'none',
  },

  li: {
    lineHeight: '2',

    ':before': {
      marginRight: '5px',
      marginTop: '0',
      fontSize: '70%',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '12px',
      display: 'inline-block',
      lineHeight: '1'
    }
  },

  heading: {
    margin: 0
  },

  p: {
    display: 'inline-block',
    marginTop: 0,
    marginBottom: 0
  },

  message: {
    backgroundColor: 'rgb(250, 250, 250)',
    padding: '10px',
    margin: '10px'
  },

  pass: {
    ':before': {
      content: "'✔'",
      padding: '4px 5px',
      backgroundColor: 'green'
    }
  },
});
