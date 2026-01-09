import { useState, useRef } from 'react';
import { validators } from 'investira.sdk';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
    Typography
} from '@mui/material';

import { Success, Error, Icon, Loading, CenterInView } from '../';

const initProps = { wrapContent: true, fullScreen: false };

// Decorator
const withDialog = (Component, pProps = initProps) => {
    const styles = {
        actions: {
            flex: '0 0 auto',
            display: 'flex',
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'center'
        },
        contentSpacer: {
            marginBottom: '24px'
        },
        fetching: {
            height: '120px'
        }
    };

    const SuccessContent = pProps => {
        const { message, messages, onClick, width, height } = pProps;
        return (
            <>
                <DialogContentText component={'div'}>
                    <Success width={width} height={height} startAnimation />
                </DialogContentText>
                <DialogContentText component={'div'}>
                    <Typography variant={'h5'} color={'textPrimary'} align={'center'}>
                        {messages?.success ? messages.success.title : 'Título de Sucesso'}
                    </Typography>
                    <Typography variant={'body2'} color={'textSecondary'} align={'center'}>
                        {message
                            ? message
                            : messages?.success
                            ? messages.success.content
                            : 'Mensagem de sucesso'}
                    </Typography>
                </DialogContentText>

                <div style={styles.actions}>
                    <Button
                        key={'success_ok'}
                        variant={'outlined'}
                        color={'primary'}
                        //onClick={handleCloseDialog}
                        onClick={onClick}>
                        OK
                    </Button>
                </div>
            </>
        );
    };

    const ErrorContent = pProps => {
        const { message, messages, width, height, retryAction, onClick } = pProps;
        return (
            <>
                <DialogContentText component={'div'}>
                    <Error width={width} height={height} startAnimation />
                </DialogContentText>
                <DialogContentText component={'div'}>
                    <Typography variant={'h5'} color={'textPrimary'} align={'center'}>
                        {messages && messages.error ? messages.error.title : 'Título de Error'}
                    </Typography>
                    <Typography variant={'body2'} color={'textSecondary'} align={'center'}>
                        {message
                            ? message
                            : messages?.error
                            ? messages.error.content
                            : 'Mensagem de erro'}
                    </Typography>
                </DialogContentText>

                {retryAction && (
                    <div style={styles.actions}>
                        <Button
                            key={'success_ok'}
                            variant={'outlined'}
                            color={'primary'}
                            onClick={onClick}>
                            Tentar Novamente
                        </Button>
                    </div>
                )}
            </>
        );
    };

    function WrapComponent(props) {
        const [isOpen, setIsOpen] = useState(false);
        const [status, setStatus] = useState(null); //success | error
        const [message, setMessage] = useState(null);

        const body = useRef({});
        const formSubmit = useRef(null);

        /**
         * Exibe o Dialog
         *
         * @param {object} pProps
         * {
         *   title: {
         *       label: 'Teste'
         *   },
         *  content: <p>Apenas um conteúdo de teste</p>,
         *   actions: [
         *       {
         *            label: 'Action',
         *            onClick: handleAction
         *        }
         *    ],
         *    messages: {
         *        success: {
         *            title: 'Sucesso!',
         *            content:
         *                'Contato foi bloqueado, a partir de agora nenhuma das suas infomações serão compartilhadas com José Silva.'
         *        },
         *        error: {
         *           title: 'Falha ao bloquear',
         *            content: 'Ocorreu um erro ao tentar bloquear o contato.'
         *        }
         *    },
         *    retryAction: handleAction
         * }
         */
        const handleOpenDialog = pProps => {
            body.current = { ...pProps };
            setIsOpen(true);
        };

        // Fechar Dialog
        const handleCloseDialog = (pEvent, callback) => {
            pEvent && pEvent.preventDefault();
            body.current = {};
            setIsOpen(false);
            setStatus(null);
            setMessage(null);

            validators.isFunction(callback) && callback();

            pEvent && pEvent.stopPropagation();
        };

        // Altera para Dialog de sucesso
        const handleSuccess = (pMessage = null) => {
            setStatus('success');
            setMessage(pMessage);
        };

        // Altera para Dialog de erro
        const handleError = (pMessage = null) => {
            setStatus('error');
            setMessage(pMessage);
        };

        // Altera para Dialog de loading
        const handleFetching = () => {
            setStatus('fetching');
            setMessage(message);
        };

        // Reinicia para Dialog default
        const handleResetStatus = () => {
            setStatus('null');
            setMessage(message);
        };

        // Ação de nova tentativa do Dialog de erro
        const handleRetry = () => {
            const { retryAction } = body.current;
            retryAction && retryAction();
        };

        const registerSubmitDialog = pFormikHandleSubmit => {
            formSubmit.current = pFormikHandleSubmit;
        };

        const handleSubmitDialog = pEvent => {
            pEvent && pEvent.preventDefault();
            formSubmit.current && formSubmit.current();
            pEvent && pEvent.stopPropagation();
        };

        // Renders
        const titleRender = pStatus => {
            const { title } = body.current;
            switch (pStatus) {
                case 'success':
                    return (
                        <DialogTitle
                            style={{
                                textAlign: 'right',
                                justifyContent: 'flex-end'
                            }}
                            onClose={handleCloseDialog}
                        />
                    );
                case 'error':
                    return (
                        <DialogTitle
                            style={{
                                textAlign: 'right',
                                justifyContent: 'flex-end'
                            }}
                            onClose={handleCloseDialog}
                        />
                    );
                case 'fetching':
                    return null;
                default:
                    return (
                        <DialogTitle
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                            {...(title.onclose === false ? {} : { onClose: handleCloseDialog })}>
                            {title.label}
                            {/* {title.label && typeof title.label === "string" ? (
                <Typography variant={"h6"} color={"textPrimary"}>
                  {title.label}
                </Typography>
              ) : (
                title.label
              )} */}
                        </DialogTitle>
                    );
            }
        };

        const contentRender = pStatus => {
            const { content, messages, retryAction, actions } = body.current;

            const withProps = {
                ...initProps,
                ...pProps
            };

            switch (pStatus) {
                case 'success':
                    return withProps.fullScreen ? (
                        <CenterInView>
                            <SuccessContent
                                messages={messages}
                                message={message}
                                onClick={handleCloseDialog}
                                width={175}
                                height={175}
                            />
                        </CenterInView>
                    ) : (
                        <SuccessContent
                            width={100}
                            height={100}
                            messages={messages}
                            message={message}
                            onClick={e => handleCloseDialog(e, messages?.success?.callback)}
                        />
                    );
                case 'error':
                    return withProps.fullScreen ? (
                        <CenterInView>
                            <ErrorContent
                                width={175}
                                height={175}
                                messages={messages}
                                message={message}
                                retryAction={retryAction}
                                onClick={handleRetry}
                            />
                        </CenterInView>
                    ) : (
                        <ErrorContent
                            width={100}
                            height={100}
                            messages={messages}
                            message={message}
                            retryAction={retryAction}
                            onClick={handleRetry}
                        />
                    );

                case 'fetching':
                    return (
                        <div style={styles.fetching}>
                            <CenterInView>
                                <Loading />
                            </CenterInView>
                        </div>
                    );
                default:
                    if (actions) {
                        return content;
                    } else {
                        return <div style={styles.contentSpacer}>{content}</div>;
                    }
            }
        };

        const actionRender = pStatus => {
            const { actions } = body.current;
            switch (pStatus) {
                case 'success':
                    return null;
                case 'error':
                    return null;
                case 'fetching':
                    return null;
                default:
                    return (
                        <DialogActions>
                            {actions.map((xAction, xIndex) => {
                                const xActionProps = {
                                    onClick: xAction.onClick,
                                    ...(xAction.type === 'submit' && {
                                        onClick: handleSubmitDialog
                                    }),
                                    style: { pointerEvents: 'all' },
                                    color: xAction.color || 'primary',
                                    ...(xAction.startIcon && {
                                        startIcon: <Icon iconName={xAction.startIcon} />
                                    })
                                };

                                return (
                                    <Button key={xIndex} {...xActionProps}>
                                        {xAction.label}
                                    </Button>
                                );
                            })}
                        </DialogActions>
                    );
            }
        };

        const xProps = {
            onOpenDialog: handleOpenDialog,
            onCloseDialog: handleCloseDialog,
            onSuccess: handleSuccess,
            onError: handleError,
            onFetching: handleFetching,
            onResetStatus: handleResetStatus,
            registerSubmit: registerSubmitDialog,
            ...props
        };

        const withProps = {
            ...initProps,
            ...pProps
        };

        const { title, content, actions } = body.current;

        if (!validators.isEmpty(actions) && actions.length > 3) {
            console.error('Não adicione mais que 3 actions para o dialog');
        }

        return (
            <>
                <Component {...xProps} />
                <Dialog
                    fullWidth
                    fullScreen={withProps.fullScreen}
                    open={isOpen}
                    onClose={handleCloseDialog}
                    //TransitionComponent={Transition}
                    //PaperProps={{ style: { pointerEvents: 'none' } }}
                >
                    {!validators.isEmpty(title) && titleRender(status)}

                    {!validators.isNull(content) &&
                        (withProps.wrapContent ? (
                            <DialogContent>{contentRender(status)}</DialogContent>
                        ) : (
                            contentRender(status)
                        ))}

                    {!validators.isEmpty(actions) && actionRender(status)}
                </Dialog>
            </>
        );
    }

    return WrapComponent;
};

export default withDialog;
