import { useMemo, useState } from 'react';

const RouteNameFilter = props => {
    const { routes, selectedRouteNames, setSelectedRouteNames, setIsFilterActive } = props;

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const uniqueRouteNames = useMemo(() => {
        const routeNames = routes.map(route => route.routeName);

        return Array.from(new Set(routeNames));
    }, [routes]);

    const toggleDropdown = () => {
        setIsDropdownVisible(prevState => !prevState);
    };

    const toggleRoute = routeName => {
        setSelectedRouteNames(prevSelected =>
            prevSelected.includes(routeName)
                ? selectedRouteNames.filter(name => name !== routeName)
                : [...prevSelected, routeName]
        );

        setIsFilterActive(true);
    };

    return (
        <div className={'filterWrapper'}>
            <button onClick={toggleDropdown} className={'button'}>
                Filter Routes
            </button>

            {isDropdownVisible && (
                <ul className={'dropdown'}>
                    {uniqueRouteNames.map(routeName => (
                        <li key={routeName} className={'dropdown-item'}>
                            <label>
                                <input
                                    type={'checkbox'}
                                    checked={selectedRouteNames.includes(routeName)}
                                    onChange={() => toggleRoute(routeName)}
                                />
                                <span>{routeName}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RouteNameFilter;
