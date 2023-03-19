import { useEffect, useState } from "react";
import { Payload } from "../types/payload";
import jwtDecode from "jwt-decode";

type AuthInfo = {
	checked: boolean;
	isAuthenticated: boolean;
};

export const useAuth = (): AuthInfo => {
	const [authInfo, setAuthInfo] = useState<AuthInfo>({
		checked: false,
		isAuthenticated: false,
	});

	useEffect(() => {
		const token = localStorage.getItem("token");
		try {
			if (token) {
				const decodedToken = jwtDecode<Payload>(token);
				const withOutExpiration = decodedToken.exp * 1000 < Date.now();

				if (withOutExpiration) {
					localStorage.removeItem("token");
					setAuthInfo({ checked: true, isAuthenticated: false });
				} else {
					setAuthInfo({ checked: true, isAuthenticated: true });
				}
			} else {
				setAuthInfo({ checked: true, isAuthenticated: false });
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setAuthInfo({ checked: true, isAuthenticated: false });
			}
		}
	}, []);

	return authInfo;
};
