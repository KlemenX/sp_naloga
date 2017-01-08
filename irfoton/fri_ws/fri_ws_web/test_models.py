import datetime

from django.utils import timezone
from django.test import TestCase

from .models import Article

class ArticleTests(TestCase):
  def test_is_recent(self):
    """
    is_recent() should return True, if the publish date is recent; False
    otherwise.
    """
    a_recent = Article(title='test_recent', content='', pub_date=timezone.now())
    a_old = Article(title='test_recent', content='', pub_date=timezone.now() - datetime.timedelta(days=30))
    
    self.assertIs(a_recent.is_recent(), True)
    self.assertIs(a_old.is_recent(), False)

