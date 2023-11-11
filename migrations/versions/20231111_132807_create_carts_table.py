"""Create carts table

Revision ID: 9718566a9a06
Revises: 9281d813294d
Create Date: 2023-11-11 13:28:07.398833

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9718566a9a06'
down_revision = '9281d813294d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('carts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('review',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.alter_column('review',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)

    op.drop_table('carts')
    # ### end Alembic commands ###