import argparse

mainParser = argparse.ArgumentParser(add_help=False)
mainParser.add_argument('--log_level', type=str, default="INFO", help='--log_level INFO')
subParsers = mainParser.add_subparsers(help='commands')

webParser = subParsers.add_parser('web', parents=[mainParser])
webParser.set_defaults(component='web')
webParser.add_argument('--bind_address', type=str, default="127.0.0.1", help='--bind_address 127.0.0.1')
webParser.add_argument('--bind_port', type=int, default=5615, help='--bind_port 5615')
webParser.add_argument('--database_url', type=str, default="mongodb://127.0.0.1", help='--database_url mongodb://127.0.0.1')
webParser.add_argument('--database', type=str, default="lab1", help='--database lab1')

args = mainParser.parse_args()

if args.component == "web":
    from core import globalSettings
    globalSettings.args = args

    from core import app
    import uvicorn
    from fastapi.middleware.cors import CORSMiddleware
    # Add CORS middleware to allow any origin
    app.app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    forwardedAllowIps = "*"
    kwargs = {}
    uvicorn.run(app.app, host=args.bind_address, port=args.bind_port, forwarded_allow_ips=forwardedAllowIps, **kwargs)
   