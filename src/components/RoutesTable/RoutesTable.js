import { useMemo } from 'react';

const RoutesTable = props => {
    const { routes, selectedRouteNames } = props;

    const filteredRoutes = useMemo(
        () => routes.filter(route => selectedRouteNames.includes(route.routeName)),
        [routes, selectedRouteNames]
    );

    const renderPoints = points => (
        <table className={'table'}>
            <thead>
                <tr>
                    <th>Calculation Type</th>
                    <th>Point Type</th>
                    <th>Fee Cost</th>
                    <th>Final Cost</th>
                    <th>Otm/Itm</th>
                    <th>Spread</th>
                    <th>Tariff Cost Fixed</th>
                    <th>Tariff Cost Variable</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {points.map(point => {
                    const {
                        calculationType,
                        pointType,
                        feeCost,
                        finalCost,
                        otmItm,
                        spread,
                        tariffCostFixed,
                        tariffCostVariable,
                        value,
                    } = point;
                    return (
                        <tr key={calculationType + pointType}>
                            <td>{calculationType}</td>
                            <td>{pointType}</td>
                            <td>{feeCost}</td>
                            <td>{finalCost}</td>
                            <td>{otmItm}</td>
                            <td>{spread}</td>
                            <td>{tariffCostFixed}</td>
                            <td>{tariffCostVariable}</td>
                            <td>{value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    return (
        <table className={'table'}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>source</th>
                    <th>points</th>
                </tr>
            </thead>
            <tbody>
                {filteredRoutes.map(route => (
                    <tr key={route.routeId}>
                        <td>{route.routeId}</td>
                        <td>{route.routeName}</td>
                        <td>{route.source}</td>
                        <td>{renderPoints(route.points)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RoutesTable;
