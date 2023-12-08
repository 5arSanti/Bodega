import React from "react";

export const AppContext = React.createContext();

const AppProvider = ({children}) => {
	//API -- Cambiar el valor de la variable domain segun la infraestructura de produccion
    const domain = "http://localhost:3080";
	const api = `${domain}/api/v1`;

	//-------------------------------------
    const [apiUri, setApiUri] = React.useState(api);

    //ADMIN
    const [admin, setAdmin] = React.useState(false);
	//Data, loading, Error
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [error, setError] = React.useState(false);
	const [allOk, setAllOk] = React.useState(false);

    const [statusMessage, setStatusMessage] = React.useState("");


	const messageHandler = (type, message) => {
		if(type === "error") {
			let errorMessage = `Ocurrio un error: ${message}`;
			setStatusMessage(errorMessage);
			setError(true);
			setTimeout(() => {
				setError(false);
				setStatusMessage("");
			}, 6000)
		} else if (type === "all-ok") {
			setStatusMessage(message);
			setAllOk(true);
			setTimeout(() => {
				setAllOk(false);
				setStatusMessage("");
			}, 4000)
		}

	}


	// FETCH DATA
	const [responseData, setResponseData ] = React.useState(null);
    const [users, setUsers] = React.useState();
    const [ isLoged, setIsLoged ] = React.useState(false);

	const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`${apiUri}/${endpoint}`);

            if (!response.status === 200) {
				messageHandler("error", `Error fetching ${endpoint}: ${response.statusText}`);
                // throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
            }

            return await response.json();

        }
        catch (err) {
			messageHandler("error", `Error fetching ${endpoint}: ${err.message}`);
            // throw new Error(`Error fetching ${endpoint}: ${err.message}`);
        }
    };

    const fetchAllData = async () => {
        try {
            setLoading(true);
            const endpoints = [
				"info"
            ];

            // Realizar todas las solicitudes en paralelo
            const resultsArray = await Promise.all(endpoints.map(fetchData));

            const combinedResults = resultsArray.reduce((acc, result) => {
                return { ...acc, ...result };
            }, {});

            setResponseData(combinedResults);
			setUsers(combinedResults.users)

        } catch (err) {
			messageHandler("error", `${err.message}`);
        }
        finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchAllData();
    }, [isLoged]);

    //Login
		//CERRAR SESION
	const closeSession = () => {
		setAdmin(false);
		setIsLoged(false);
		resetUsersInfo();

		messageHandler("all-ok", "Sesión cerrada correctamente")
	}

	//CREACION, EDICION y ELIMINACION DE USUARIOS
		//CREACION
	const [creatingUser, setCreatingUser] = React.useState(null);
	const handleCloseCreateForm = () => {
		setCreatingUser(null);
	};

		//EDICION
	const [editingUser, setEditingUser] = React.useState(null);

	const handleCloseEditForm = () => {
		setEditingUser(null);
	};

		// RESET USERS
	const resetUsersInfo = () => {
		setCreatingUser(null);
		setEditingUser(null);
		setShowConsolidado(null);
		setConsolidadoTotal(null);
		setToggleNavBarResponsive(false);
	}


    //CONSOLIDADO
	const currentDate = new Date();
	const currentMonth = (currentDate.getMonth() + 1).toString(); // Ajustar el índice del mes
	const currentYear = currentDate.getFullYear().toString();

	const [filters, setFilters] = React.useState({
		// "mes": currentMonth,
		// "ano": currentYear,
		"mes": "",
		"ano": "",
    });

	const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };

    const [showConsolidado, setShowConsolidado] = React.useState([]);
    const [consolidado, setConsolidado] = React.useState(null);

	const fetchConsolidadoData = async () => {
        try {
            setLoading(true);
            const filterParams = new URLSearchParams(filters);
            const endpoints = [
				// `consolidado?${filterParams.toString()}`
				`consolidado/tablas?${filterParams.toString()}`
            ];

            const resultsArray = await Promise.all(endpoints.map(fetchData));

			setConsolidado(resultsArray[0]);

        } catch (err) {
			messageHandler("error", `${err.message}`);
        }
        finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchConsolidadoData();
    }, [filters, showConsolidado]);


	// Screen width manager
	const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
	React.useEffect(() => {
		function handleResize() {
		setWindowWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);


	const [toggleNavBarResponsive, setToggleNavBarResponsive] = React.useState(false);

    return(
        <AppContext.Provider
            value={{
				//Managers Principales
				apiUri,

                //ADMIN
                admin,
                setAdmin,

                data,
                setData,
				loading,
				setLoading,
				error,
				setError,
				allOk,
				setAllOk,
				statusMessage,
				setStatusMessage,

				messageHandler,


                windowWidth,
                setWindowWidth,
                toggleNavBarResponsive,
                setToggleNavBarResponsive,



				responseData,
				setResponseData,
				filters,
				setFilters,

                isLoged,
                setIsLoged,
				closeSession,

                users,
                setUsers,

				creatingUser,

				setCreatingUser,
				handleCloseCreateForm,

				editingUser,
				setEditingUser,
				handleCloseEditForm,

				resetUsersInfo,

				//Consolidado
				handleFilterChange,
				consolidado,
				setConsolidado,
				showConsolidado,
				setShowConsolidado

            }}
        >
            { children }
        </AppContext.Provider>
    );
}

export { AppProvider };