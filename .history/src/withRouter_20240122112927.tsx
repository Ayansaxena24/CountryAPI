import {useLocation, useNavigation, useParams } from 'react-router-dom';

const withRouter = (Component : any) => {
    const WithRouter = (props : any) => {
        const location = useLocation();
        const navigate = useNavigation();
        const params = useParams(); 
        return <Component
        {...props}
        location = {location}
        navigate = {navigate}
        params = {params}
        />;
    };
    return WithRouter;
};


export default withRouter;