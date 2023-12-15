import { connection, startConnection } from './utils/signalRConnection';
import { useEffect, useState } from 'react';
import RoutesTable from './components/RoutesTable/RoutesTable';
import RouteNameFilter from './components/RouteNameFilter/RouteNameFilter';

function App() {
    const [routes, setRoutes] = useState([]);
    const [selectedRouteNames, setSelectedRouteNames] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);

    useEffect(() => {
        startConnection();

        connection.on('ReceiveMessage', receivedRoute => {
            handleRouteReceive(receivedRoute);
        });
    }, []);

    // by default, we will have all received route names as selected in the filter. once the filter is changed we stop doing that
    useEffect(() => {
        if (!isFilterActive) {
            setSelectedRouteNames(routes.map(route => route.routeName));
        }
    }, [routes, isFilterActive]);

    const handleRouteReceive = receivedRoute => {
        setRoutes(prevState => {
            const doesRouteExist = prevState.some(route => route.routeId === receivedRoute.routeId);

            if (doesRouteExist) {
                return prevState.map(route =>
                    route.routeId === receivedRoute.routeId
                        ? getNewRoute({
                              receivedRoute,
                              currentRoute: route,
                          })
                        : route
                );
            } else {
                return [...prevState, receivedRoute];
            }
        });
    };

    const getNewRoute = ({ currentRoute, receivedRoute }) => {
        let points = [...currentRoute.points];

        receivedRoute.points.forEach(newPoint => {
            const doesPointExist = points.some(currentPoint => isSamePoint(currentPoint, newPoint));

            if (doesPointExist) {
                points = points.map(currentPoint => (isSamePoint(currentPoint, newPoint) ? newPoint : currentPoint));
            } else {
                points.push(newPoint);
            }
        });

        return { ...receivedRoute, points };
    };

    const isSamePoint = (a, b) => a.pointType === b.pointType && a.calculationType === b.calculationType;

    return (
        <div className='App'>
            <RouteNameFilter
                routes={routes}
                selectedRouteNames={selectedRouteNames}
                setSelectedRouteNames={setSelectedRouteNames}
                setIsFilterActive={setIsFilterActive}
            />
            <RoutesTable routes={routes} selectedRouteNames={selectedRouteNames} />
        </div>
    );
}

export default App;
