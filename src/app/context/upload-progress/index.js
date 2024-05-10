import {createContext, useContext, useState} from 'react';
import {Progress} from 'antd';

// upload progress Context Create:
const uploadProgressContext = createContext(0);

// create spinner provider:
export const UploadProgressProvider = ({children}) => {
    const [uploadPercent, setUploadPercent] = useState(0);
    const [showProgress, setShowProgress] = useState(false);

    return (
        <uploadProgressContext.Provider value={{uploadPercent, setUploadPercent, setShowProgress}}>
            {!!showProgress &&
                <div className="px-[30px]">
                    <Progress percent={uploadPercent} format={(percent) => `%${percent.toFixed(1)}`} />
                </div>
            }

            {children}
        </uploadProgressContext.Provider>
    );

};

export const useUploadProgress = () => {
    const uploadProgressState = useContext(uploadProgressContext);

    const uploadPercent = uploadProgressState?.uploadPercent;
    const handleOnChangeUploadDPercent = uploadProgressState?.setUploadPercent;
    const setShowProgress = uploadProgressState?.setShowProgress;

    const handleToggleShowProgressbar = async (toggle) => {
        if (toggle) {
            await setShowProgress(true);
        } else {
            await setShowProgress(false);
            await handleOnChangeUploadDPercent(0);
        }
    };

    return {uploadPercent, handleOnChangeUploadDPercent, handleToggleShowProgressbar};
};
