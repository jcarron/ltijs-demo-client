import React, { useState, useEffect, useCallback } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createStyles, makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container'

import Fab from '@mui/material/Fab'
import ky from 'ky'
import NavigationIcon from '@mui/icons-material/Navigation'
import $ from 'jquery'

//import { useSnackbar } from 'notistack'

//const useStyles = makeStyles(theme => ({
//  '@global': {
//    body: {
//      backgroundColor: theme.palette.common.white
//    }
//  },
//  paper: {
//    overflow: 'hidden',
//    width: '100%',
//    display: 'flex',
//    justifyContent: 'center'
//  },
//  fab: {
//    marginTop: theme.spacing(4)
//  },
//  btnDiv: {
//    display: 'flex',
//    justifyContent: 'center'
//  },
//  logodiv: {
//    marginBottom: theme.spacing(8),
//    backgroundColor: 'transparent '
//  },
//  logo: {
//    cursor: 'pointer'
//  },
//  margin: {
//    marginTop: theme.spacing(4),
//    backgroundColor: '#013b6c'
//  },
//  table: {
//    marginTop: '10%'
//  }
//}))

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global': {
    body: {
      backgroundColor: '#fff'
    }
  },
  paper: {
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  fab: {
    marginTop: '4px'
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'center'
  },
  logodiv: {
    marginBottom: '8px',
    backgroundColor: 'transparent '
  },
  logo: {
    cursor: 'pointer'
  },
  margin: {
    marginTop: '4px',
    backgroundColor: '#013b6c'
  },
  table: {
    marginTop: '10%'
  }
}))

const theme = createTheme();

export default function App () {
  const classes = useStyles()
  //const { enqueueSnackbar } = useSnackbar()
//  const [resource, setResource] = useState(false)
  const [dataset, setDataset] = useState([])
//  const [selected, setSelected] = useState([])

  const getLtik = () => {
    const searchParams = new URLSearchParams(window.location.search)
    const ltik = searchParams.get('ltik')
    if (!ltik) throw new Error('Missing lti key.')
    return ltik
  }

  const errorPrompt = useCallback(async (message) => {
	  
    //enqueueSnackbar(message, { variant: 'error' })
  }, [])

  // Retrieves resource dataset
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const resources = await ky.get('/resources', { credentials: 'include', headers: { Authorization: 'Bearer ' + getLtik() } }).json()
        setDataset(resources)
      } catch (err) {
        console.log(err)
        errorPrompt('Failed retrieving example resources! ' + err)
      }
    }
    fetchResources()
  }, [errorPrompt])

  // Submits resource to deep linking endpoint
  const submit = async () => {
    try {
//      if (resource === false) {
//        errorPrompt('Please select a resource.')
//        return
//      }
//      const form = await ky.post('/deeplink', { credentials: 'include', json: dataset[resource], headers: { Authorization: 'Bearer ' + getLtik() } }).text()
      const form = await ky.post('/deeplink', { credentials: 'include', headers: { Authorization: 'Bearer ' + getLtik() } }).text()
      $('body').append(form)
    } catch (err) {
      console.log(err)
      errorPrompt('Failed creating deep link! ' + err)
    }
  }

  // Configuring data table
//  const columns = [
//    {
//      name: 'name',
//      label: 'Name'
//    },
//    {
//      name: 'value',
//      label: 'Value'
//    }
//  ]
//
//  const options = {
//    filterType: 'checkbox',
//    selectableRows: 'single',
//    disableToolbarSelect: true,
//    download: false,
//    print: false,
//    searchOpen: false,
//    search: false,
//    viewColumns: false,
//    filter: false,
//    selectableRowsOnClick: true,
//    onRowsSelect: (selResource, allRows) => { setResource(selResource[0].dataIndex); setSelected(allRows.map(row => row.dataIndex)) },
//    rowsSelected: selected,
//    rowsPerPage: 5,
//    responsive: 'scrollFullHeight'
//  }

//  return (
//    <Container component='main' maxWidth='lg'>
//      <CssBaseline />
//      <div className={classes.paper}>
//        <Grid container>
//          <Grid item xs={12} className={classes.table}>
//            <MUIDataTable
//              title='Example custom resources:'
//              data={dataset}
//              columns={columns}
//              options={options}
//            />
//            <Grid item xs className={classes.btnDiv}>
//              <Fab variant='extended' color='primary' aria-label='add' className={classes.fab} onClick={submit}>
//                <NavigationIcon className={classes.extendedIcon} />
//                Submit
//              </Fab>
//            </Grid>
//          </Grid>
//        </Grid>
//      </div>
//      {/* <Box mt={8}>
//        <Copyright />
//      </Box> */}
//    </Container>
//  )

    return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='lg'>
			  <CssBaseline />
			  <div className={classes.paper}>
				<Grid container>
				  <Grid item xs={12} className={classes.table}>
					<Grid item xs className={classes.btnDiv}>
					  <Fab variant='extended' color='primary' aria-label='add' className={classes.fab} onClick={submit}>
						<NavigationIcon className={classes.extendedIcon}/>
						Submit
					  </Fab>
					</Grid>
				  </Grid>
				</Grid>
			  </div>
			  {/* <Box mt={8}>
				<Copyright />
			  </Box> */}
			</Container>
		</ThemeProvider>
  )
}
