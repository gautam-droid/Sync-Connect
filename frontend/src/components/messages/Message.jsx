const Message = () => {
    return (
        <>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src="https://cdn2.iconfinder.com/data/icons/user-interface-169/32/about-512.png"
                            alt="Tailwind Css chat bubble component" />
                    </div>
                </div>
                <div className="chat-bubble text-white bg-orange-500">hey there</div>
                <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">09:58</div>
            </div>
        </>
    )
}

export default Message