export const limpar = (props: {
	setUsername: React.Dispatch<React.SetStateAction<string>>;
	setPlainPassword: React.Dispatch<React.SetStateAction<string>>;
	setIsAdminNew: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	props.setUsername("");
	props.setPlainPassword("");
	props.setIsAdminNew(false);
};
