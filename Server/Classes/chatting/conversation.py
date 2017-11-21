class Conversation:

    def __init__(self,transactionID='', text='', speaker='', timestamp=''):
        self.transactionID = transactionID
        self.text = text
        self.speaker = speaker
        self.timestamp = timestamp

    def save_conversation(self):
        print('save conversation')

    def isAscend_ordering(self):
        return True