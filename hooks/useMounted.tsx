// import necessary types from the react library
import { useState, useEffect } from 'react';

const useMounted = (): boolean => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => { setHasMounted(true); }, []);
    return hasMounted;
};

export default useMounted;