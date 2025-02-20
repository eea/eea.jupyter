""" Main
"""

import logging
import json

from eea.jupyter.controllers.plotly import PlotlyController


plotlyCtrl = PlotlyController()


def upload_plotly(**kwargs):
    """
    Uploads a Plotly figure to a specified API endpoint.

    This function validates the input, initializes the Plotly controller,
    and uploads the Plotly figure to the API. If any step fails, it logs
    an error message.
    """
    err = plotlyCtrl.init(**kwargs)
    if err:
        return logging.error(err)

    fig = kwargs.get("fig", None)

    chart_data = fig if isinstance(fig, dict) else json.loads(fig.to_json())

    try:
        err = plotlyCtrl.upload_plotly(chart_data=chart_data, **kwargs)
        if err:
            return logging.error(err)
    except Exception:
        return logging.exception(
            "Error handling visualization at %s", kwargs.get("url", ""))

    return None


def uploadPlotly(url, fig, **metadata):
    """
    Uploads a Plotly figure to a specified URL with additional metadata.
    """
    err = plotlyCtrl.init(url=url, **metadata)
    if err:
        return logging.error(err)
    chart_data = fig if isinstance(fig, dict) else json.loads(fig.to_json())
    return plotlyCtrl.uploadPlotly(chart_data, **metadata)
