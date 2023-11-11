"""create cartitems table

Revision ID: 86135dcfa06f
Revises: 9281d813294d
Create Date: 2023-11-11 13:24:26.818933

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '86135dcfa06f'
down_revision = '9281d813294d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cartitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('cart_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('reviews')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reviews',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('review', sa.VARCHAR(length=255), nullable=False),
    sa.Column('star_rating', sa.INTEGER(), nullable=False),
    sa.Column('product_id', sa.INTEGER(), nullable=False),
    sa.Column('created_at', sa.DATETIME(), nullable=True),
    sa.Column('updated_at', sa.DATETIME(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.drop_table('cartitems')
    # ### end Alembic commands ###
