import logging

from core import core

logger = logging.getLogger(__name__)
logger.setLevel(core.globalSettings.args.log_level)

class _result(core.database._document):
    name = str()
    email = str()
    mainType = str()

    _dbCollection = "results"

    def new(self,name, email, mainType):
        self.name = name
        self.email = email
        self.mainType = mainType
        return super(_result, self).new()
    