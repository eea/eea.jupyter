import IPython
import requests
from urllib.parse import urlparse


class PlotlyController:
    """
    A class that represents a Plotly controller.

    Attributes:
      url (str): The URL of the plotly visualization to be added or edited.

    Methods:
      __init__(self, url): Initializes a new instance of the PlotlyController class.
      uploadPlotly(self, chart_data, metadata): Uploads Plotly chart data.
    """

    def __init__(self, url):
        self.url_tuple = urlparse(url)
        self.host = self.url_tuple.scheme + "://" + self.url_tuple.netloc
        self.path = self.__sanitizePath(self.url_tuple.path)

    def __sanitizePath(self, path):
        return path.replace("/edit", "").replace("/add", "")

    def uploadPlotly(self, chart_data, metadata):
        url = self.host + '/login?return_url='

        status = requests.get(url).status_code

        if status in [200, 401, 403]:
            url += self.path + '/edit'
        else:
            url += self.path + '/add'

        html = '<div><script>({})()</script><iframe id="jupyter-ch" src="{}" width="100%" height="1080" /></div>'.format(
            self.__getOnLoadHandlerJS(chart_data, metadata), url)
        return IPython.display.HTML(html)

    def __getOnLoadHandlerJS(self, chart_data, metadata={}):
        return open('./scripts/plotly.js', 'r').read() % ({
            "type": 'jupyter-ch:setContent',
            "content": {
                **metadata,
                "visualization": {
                    "chartData": chart_data
                }
            }
        })
