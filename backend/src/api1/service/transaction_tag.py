from ..model.transaction import TransactionTag, Transaction
import uuid


class TransactionTagUtil:
    def create_a_tag(self, transaction_id, data):
        _tag = TransactionTag(
            id = str(uuid.uuid4()),
            tags = data,
            transaction_id = Transaction.get_by_id(transaction_id)
        )
        _tag.add()

    def create_tags(self, transaction_id, data):
        for tag in data:
            self.create_a_tag(transaction_id, tag)

    def delete_tags(self, transaction_id):
        tags = TransactionTag.query.filter_by(transaction=transaction_id).all()
    
        for tag in tags:
            tag.delete()

    def get_tags(self, transaction_id):
        tags = TransactionTag.query.filter_by(transaction=transaction_id).all()
        tags = [x.toDict().get('tags') for x in tags]

        return tags