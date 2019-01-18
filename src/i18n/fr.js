export default {
	'$vuetify': {
		dataIterator: {
			rowsPerPageText: 'Elements par page:',
			rowsPerPageAll: 'Tous',
			pageText: '{0}-{1} sur {2}',
			noResultsText: 'No matching records found',
			nextPage: 'Page suivante',
			prevPage: 'Page précédente'
		},
		dataTable: {
			rowsPerPageText: 'Colones par page:'
		},
		noDataText: 'No data available'
	},
	button: {
		connect: {
			connect: 'Connection',
			connecting: 'Connection...',
			disconnect: 'Déconnection',
			disconnecting: 'Déconnection...'
		},
		emergencyStop: {
			caption: 'Arret d\'urgence',
			title: 'Force le redémarrage de la machine (M112+M999)'
		},
		home: {
			caption: 'Déplacement a l\'origine {0}',
			captionAll: 'Déplacement de tous les axes aux origines',
			title: 'Déplace l\'axe {0} a l\'origine (G28 {0})',
			titleAll: 'Déplacement de tous les axes a l\'origine (G28)'
		},
		upload: {
			gcodes: {
				caption: 'Télécharger un(des) fichier(s) G-Code',
				title: 'Télécharger un ou plusieurs fichiers G-Code (glissé-déposé est aussi supporté)'
			},
			start: {
				caption: 'Télécharger & Imprimer',
				title: 'Télécharger & Imprimer un ou plusieurs fichiers G-Code (glissé-déposé est aussi supporté)'
			},
			macros: {
				caption: 'Télécharger un(des) fichier(s) Macro',
				title: 'Télécharger un ou plusieurs fichiers macro (glissé-déposé est aussi supporté)'
			},
			filaments: {
				caption: 'Télécharger un(des) fichier(s) Filament',
				title: 'Télécharger un ou plusieurs fichiers filament (glissé-déposé est aussi supporté)'
			},
			display: {
				caption: 'Télécharger un(des) fichier(s) Menu',
				title: 'Télécharger un ou plusieurs fichiers menu (glissé-déposé est aussi supporté)'
			},
			sys: {
				caption: 'Télécharger un(des) fichier(s) Sistèmes',
				title: 'Télécharger un ou plusieurs fichiers system (glissé-déposé est aussi supporté)'
			},
			www: {
				caption: 'Télécharger un(des) fichier(s) Web',
				title: 'Télécharger un ou plusieurs fichiers web (glissé-déposé est aussi supporté)'
			},
			update: {
				caption: 'Télécharger un(des) fichier(s) Mise-a-jour',
				title: 'Télécharger un ou plusieurs fichiers de mise a jour (glissé-déposé est aussi supporté)'
			}
		}
	},
	chart: {
		temperature: {
			caption: 'Graphique des Températures',
			heater: 'Buse {0}'
		}
	},
	dialog: {
		connect: {
			title: 'Connect to Machine',
			prompt: 'Please enter the hostname and password of the machine that you would like to connect to:',
			hostPlaceholder: 'Hostname',
			hostRequired: 'Hostname is required',
			passwordPlaceholderOptional: 'Mot de passe (optionnel)',
			passwordPlaceholder: 'Mot de passe',
			passwordRequired: 'Le mot de passe est obligatoire',
			connect: 'Connection'
		},
		filament: {
			titleChange: 'Changer de Filament',
			titleLoad: 'Charger un Filament',
			prompt: 'Merci de choisir un filament:'
		},
		resetHeaterFault: {
			title: 'Effacer erreur buse',
			prompt: 'A heater fault has occurred on heater {0}. It is strongly advised to turn off your machine now and to check your wiring before you continue. If you are absolutely sure that this is not a phsical problem, you can reset the heater fault ON YOUR OWN RISK. Be aware that this is NOT RECOMMENDED and can lead to further problems. How would you like to proceed?',
			resetFault: 'Effacer erreur'
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
		cancel: 'Annuler',
		yes: 'Oui',
		no: 'Non',
		close: 'Fermer',
		reset: 'Reinitialiser',
		novalue: 'n/a',
		loading: 'chargement en cours',
		error: 'Erreur',
		info: 'Info',
		warning: 'Danger',
		success: 'Succes',
		heaterStates: [
			'off',
			'veille',
			'actif',
			'erreur',
			'reglage'
		],
		status: {
			updating: 'Mise a jour',
			off: 'Off',
			halted: 'Arrétée',
			pausing: 'En pause',
			paused: 'En pause',
			resuming: 'Reprise',
			printing: 'Impression',
			processing: 'Processing',
			simulating: 'Simulation',
			busy: 'Occupée',
			changingTool: 'Changement d\'outil',
			idle: 'Inactif',
			unknown: 'Inconnu'
		},
		rpm: 'RPM'
	},
	input: {
		code: {
			send: 'Envoyer',
			placeholder: 'Envoyer Code...'
		}
	},
	list: {
		eventLog: {
			date: 'Date',
			type: 'Type',
			message: 'Evennement',
			noEvents: 'Pas d\'evennements',
			copy: 'Copier',
			clear: 'Vider',
			downloadText: 'Télécharger comme Texte',
			downloadCSV: 'Télécharger comme CSV'
		}
	},
	menu: {
		control: {
			caption: 'Controle Machine',
			dashboard: 'Tableau de bord',
			console: 'Console',
			heightmap: 'Height Map'
		},
		job: {
			caption: 'Travail d\'impression',
			status: 'Status',
			webcam: 'Webcam',
			visualiser: 'Visualiser'
		},
		files: {
			caption: 'Gestion de fichiers',
			jobs: 'Fichiers G-Code',
			materials: 'Materiaux',
			macros: 'Macros',
			display: 'Affichage',
			system: 'Systeme',
			web: 'Web'
		},
		settings: {
			caption: 'Parametres',
			interface: 'Interface Utilisateur',
			machine: 'Machine',
			update: 'Mise a jour'
		}
	},
	notification: {
		connected: 'Connecté a {0}',
		disconnected: 'Disconnecté de {0}',
		download: {
			title: 'Downloading {0} @ {1}, {2}% complete',
			message: 'Please stand by while the file is being downloaded...',
			success: 'Download of {0} successful after {1}',
			successMulti: 'Successfully downloaded {0} files',
			error: 'Failed to download {0}'
		},
		message: 'Message',
		responseTooLong: 'Reponse trop longue, voir Console',
		upload: {
			title: 'Téléchargement {0} @ {1}, {2}%',
			message: 'Merci de patienter pendant le téléchargement...',
			success: 'Téléchargement de {0} réussit après {1}',
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
