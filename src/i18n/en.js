export default {
	'$vuetify': {
		dataIterator: {
			rowsPerPageText: 'Items per page:',
			rowsPerPageAll: 'All',
			pageText: '{0}-{1} of {2}',
			noResultsText: 'No matching records found',
			nextPage: 'Next page',
			prevPage: 'Previous page'
		},
		dataTable: {
			rowsPerPageText: 'Rows per page:'
		},
		noDataText: 'No data available'
	},
	button: {
		connect: {
			connect: 'Connect',
			connecting: 'Connecting...',
			disconnect: 'Disconnect',
			disconnecting: 'Disconnecting...'
		},
		emergencyStop: {
			caption: 'Emergency Stop',
			title: 'Enforce an immediate software reset (M112+M999)'
		},
		home: {
			caption: 'Home {0}',
			captionAll: 'Home All',
			title: 'Home the {0} axis (G28 {0})',
			titleAll: 'Home all axes (G28)'
		},
		upload: {
			gcodes: {
				caption: 'Upload G-Code File(s)',
				title: 'Upload one or more G-Code files (drag&drop is supported as well)'
			},
			start: {
				caption: 'Upload & Start',
				title: 'Upload & Start one or more G-Code files (drag&drop is supported as well)'
			},
			macros: {
				caption: 'Upload Macro File(s)',
				title: 'Upload one or more macro files (drag&drop is supported as well)'
			},
			filaments: {
				caption: 'Upload Filament Configs',
				title: 'Upload one or more filament configurations (drag&drop is supported as well)'
			},
			display: {
				caption: 'Upload Menu Files',
				title: 'Upload one or more menu files (drag&drop is supported as well)'
			},
			sys: {
				caption: 'Upload System Files',
				title: 'Upload one or more system files (drag&drop is supported as well)'
			},
			www: {
				caption: 'Upload Web Files',
				title: 'Upload one or more web files (drag&drop is supported as well)'
			},
			update: {
				caption: 'Upload Update',
				title: 'Upload an update package (drag&drop is supported as well)'
			}
		}
	},
	chart: {
		temperature: {
			caption: 'Temperature Chart',
			heater: 'Heater {0}'
		}
	},
	dialog: {
		connect: {
			title: 'Connect to Machine',
			prompt: 'Please enter the hostname and password of the machine that you would like to connect to:',
			hostPlaceholder: 'Hostname',
			hostRequired: 'Hostname is required',
			passwordPlaceholderOptional: 'Password (optional)',
			passwordPlaceholder: 'Password',
			passwordRequired: 'Password is required',
			connect: 'Connect'
		},
		filament: {
			titleChange: 'Change Filament',
			titleLoad: 'Load Filament',
			prompt: 'Please choose a filament:'
		},
		resetHeaterFault: {
			title: 'Reset Heater Fault',
			prompt: 'A heater fault has occurred on heater {0}. It is strongly advised to turn off your machine now and to check your wiring before you continue. If you are absolutely sure that this is not a phsical problem, you can reset the heater fault ON YOUR OWN RISK. Be aware that this is NOT RECOMMENDED and can lead to further problems. How would you like to proceed?',
			resetFault: 'Reset Fault'
		},
		inputRequired: 'Please enter a value',
		numberRequired: 'Please enter a valid number'
	},
	error: {
		notImplemented: '{0} is not implemented',
		invalidPassword: 'Invalid password!',
		noFreeSession: 'No more free sessions!',
		connect: 'Failed to connect to {0}',
		connectionError: 'Failed to maintain connection to {0}',
		disconnect: 'Could not disconnect cleanly from {0}',
		disconnected: 'Could not complete action because the connection has been terminated',
		cancelled: 'Operation has been cancelled',
		cors: 'CORS request failed',
		timeout: 'HTTP request timed out',
		driveUnmounted: 'Target drive is unmounted',
		directoryNotFound: 'Directory {0} not found',
		fileNotFound: 'File {0} not found',
		invalidHeightmap: 'Invalid Height Map',
		operationFailed: 'Operation failed (Reason: {0})',
		uploadStartWrongFileCount: 'Only a single file can be uploaded & started',
		uploadNoSingleZIP: 'Only a single ZIP file can be uploaded at once',
		uploadNoFiles: 'This ZIP does not contain any usable fiels',
		uploadDecompressionFailed: 'Failed to decompress ZIP file',
		codeResponse: 'Could not run code because a bad response has been received',
		codeBuffer: 'Could run code because the buffer space has been exhausted',
		enterValidNumber: 'Please enter a valid number',
		turnOffEverythingFailed: 'Failed to turn everything off',
		filelistRequestFailed: 'Failed to get file list',
		fileinfoRequestFailed: 'Failed to get file info for {0}',
		filamentsLoadFailed: 'Failed to load filaments'
	},
	generic: {
		ok: 'OK',
		cancel: 'Cancel',
		yes: 'Yes',
		no: 'No',
		close: 'Close',
		reset: 'Reset',
		novalue: 'n/a',
		loading: 'loading',
		error: 'Error',
		info: 'Info',
		warning: 'Warning',
		success: 'Success',
		heaterStates: [
			'off',
			'standby',
			'active',
			'fault',
			'tuning'
		],
		status: {
			updating: 'Updating',
			off: 'Off',
			halted: 'Halted',
			pausing: 'Pausing',
			paused: 'Paused',
			resuming: 'Resuming',
			printing: 'Printing',
			processing: 'Processing',
			simulating: 'Simulating',
			busy: 'Busy',
			changingTool: 'Changing Tool',
			idle: 'Idle',
			unknown: 'Unknown'
		},
		rpm: 'RPM'
	},
	input: {
		code: {
			send: 'Send',
			placeholder: 'Send Code...'
		}
	},
	list: {
		eventLog: {
			date: 'Date',
			type: 'Type',
			message: 'Event',
			noEvents: 'No Events',
			copy: 'Copy',
			clear: 'Clear',
			downloadText: 'Download as Text',
			downloadCSV: 'Download as CSV'
		}
	},
	menu: {
		control: {
			caption: 'Machine Control',
			dashboard: 'Dashboard',
			console: 'Console',
			heightmap: 'Height Map'
		},
		job: {
			caption: 'Current Job',
			status: 'Status',
			webcam: 'Webcam',
			visualiser: 'Visualiser'
		},
		files: {
			caption: 'File Management',
			jobs: 'G-Code Files',
			materials: 'Materials',
			macros: 'Macros',
			display: 'Display',
			system: 'System',
			web: 'Web'
		},
		settings: {
			caption: 'Settings',
			interface: 'User Interface',
			machine: 'Machine',
			update: 'Update'
		}
	},
	notification: {
		connected: 'Connected to {0}',
		disconnected: 'Disconnected from {0}',
		download: {
			title: 'Downloading {0} @ {1}, {2}% complete',
			message: 'Please stand by while the file is being downloaded...',
			success: 'Download of {0} successful after {1}',
			successMulti: 'Successfully downloaded {0} files',
			error: 'Failed to download {0}'
		},
		message: 'Message',
		responseTooLong: 'Response too long, see Console',
		upload: {
			title: 'Uploading {0} @ {1}, {2}% complete',
			message: 'Please stand by while the file is being uploaded...',
			success: 'Upload of {0} successful after {1}',
			successMulti: 'Successfully uploaded {0} files',
			error: 'Failed to upload {0}'
		}
	},
	panel: {
		movement: {
			caption: 'Machine Movement',
			compensation: 'Compensation & Calibration',
			runBed: 'True Bed Levelling (G32)',
			runDelta: 'Delta Calibration (G32)',
			compensationInUse: 'Compensation in use: {0}',
			disableBedCompensation: 'Disable Bed Compensation (M561)',
			disableMeshCompensation: 'Disable Mesh Compensation (G29 S2)',
			editMesh: 'Define Area for Mesh Compensation (M557)',
			runMesh: 'Run Mesh Compensation (G29)',
			loadMesh: 'Load Saved Height Map from SD Card (G29 S1)',
			axesNotHomed: 'The following axis is not homed:|The following axes are not homed:'
		},
		status: {
			caption: 'Status',
			mode: 'Mode: {0}',
			toolPosition: 'Tool Position',
			machinePosition: 'Machine Position',
			extruders: 'Extruder Drives',
			extruderDrive: 'Drive {0}',
			speeds: 'Speeds',
			requestedSpeed: 'Requested Speed',
			topSpeed: 'Top Speed',
			sensors: 'Sensors',
			mcuTemp: 'MCU Temperature',
			mcuTempTitle: 'Minimum: {0}, Maximum: {1}',
			vIn: 'Vin',
			vInTitle: 'Minimum: {0}, Maximum {1}',
			probe: 'Z-Probe | Z-Probes'
		},
		tools: {
			caption: 'Tools',
			controlAll: 'Control All',
			turnEverythingOff: 'Turn Everything Off',
			tool: 'Tool {0}',
			loadFilament: 'Load Filament',
			changeFilament: 'Change Filament',
			unloadFilament: 'Unload Filament',
			heater: 'Heater {0}',
			current: 'Current',
			active: 'Active',
			standby: 'Standby',
			bed: 'Bed {0}',
			chamber: 'Chamber {0}',
			extra: {
				caption: 'Extra',
				sensor: 'Sensor',
				value: 'Value',
				showInChart: 'Show in Chart'
			}
		}
	}
}
