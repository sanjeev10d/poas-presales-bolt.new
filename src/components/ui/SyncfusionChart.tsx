import React from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  AreaSeries,
  ColumnSeries,
  PieSeries,
  Category,
  DateTime,
  Legend,
  Tooltip,
  DataLabel,
  Highlight,
  Selection,
  ChartTheme
} from '@syncfusion/ej2-react-charts';

interface SyncfusionChartProps {
  type: 'line' | 'area' | 'column' | 'pie';
  data: any[];
  config?: {
    title?: string;
    subtitle?: string;
    colors?: string[];
    height?: number;
    width?: string;
    showGrid?: boolean;
    showLegend?: boolean;
    showTooltip?: boolean;
    showDataLabels?: boolean;
    enableAnimation?: boolean;
    theme?: ChartTheme;
    xField?: string;
    yField?: string;
    pointColorMapping?: string;
  };
  className?: string;
}

const SyncfusionChart: React.FC<SyncfusionChartProps> = ({
  type,
  data,
  config = {},
  className = ''
}) => {
  const {
    title = '',
    subtitle = '',
    colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
    height = 350,
    width = '100%',
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    showDataLabels = false,
    enableAnimation = true,
    theme = 'Material',
    xField = 'x',
    yField = 'y',
    pointColorMapping = ''
  } = config;

  // Enhanced styling configuration
  const chartArea = {
    border: { width: 0 },
    background: 'transparent'
  };

  const primaryXAxis = {
    valueType: type === 'pie' ? undefined : 'Category',
    majorGridLines: { width: showGrid ? 1 : 0, color: '#E5E7EB', dashArray: '3,3' },
    minorGridLines: { width: 0 },
    lineStyle: { width: 1, color: '#D1D5DB' },
    labelStyle: {
      color: '#6B7280',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '500'
    },
    titleStyle: {
      color: '#374151',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '14px',
      fontWeight: '600'
    }
  };

  const primaryYAxis = {
    majorGridLines: { width: showGrid ? 1 : 0, color: '#E5E7EB', dashArray: '3,3' },
    minorGridLines: { width: 0 },
    lineStyle: { width: 1, color: '#D1D5DB' },
    labelStyle: {
      color: '#6B7280',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '500'
    },
    titleStyle: {
      color: '#374151',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '14px',
      fontWeight: '600'
    }
  };

  const legendSettings = showLegend ? {
    visible: true,
    position: 'Bottom',
    alignment: 'Center',
    textStyle: {
      color: '#6B7280',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '500'
    },
    border: { width: 0 },
    background: 'transparent',
    padding: 10
  } : { visible: false };

  const tooltipSettings = showTooltip ? {
    enable: true,
    shared: type !== 'pie',
    format: type === 'pie' ? '${point.x}: <b>${point.y}</b>' : '${series.name}: <b>${point.y}</b>',
    textStyle: {
      color: '#FFFFFF',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '500'
    },
    border: { width: 0 },
    fill: '#1F2937',
    opacity: 0.95,
    enableMarker: true
  } : { enable: false };

  const titleStyle = {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    textAlignment: 'Center' as const
  };

  const subTitleStyle = {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6B7280',
    textAlignment: 'Center' as const
  };

  const dataLabelSettings = showDataLabels ? {
    visible: true,
    position: type === 'pie' ? 'Outside' : 'Top',
    font: {
      color: '#374151',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: '11px',
      fontWeight: '600'
    },
    border: { width: 0 },
    fill: 'transparent'
  } : { visible: false };

  const animationSettings = enableAnimation ? {
    enable: true,
    duration: 1000,
    delay: 100
  } : { enable: false };

  const highlightSettings = {
    enable: true,
    mode: 'Point',
    pattern: 'None'
  };

  const selectionSettings = {
    enable: true,
    mode: 'Point',
    pattern: 'None'
  };

  const getSeriesType = () => {
    switch (type) {
      case 'line':
        return LineSeries;
      case 'area':
        return AreaSeries;
      case 'column':
        return ColumnSeries;
      case 'pie':
        return PieSeries;
      default:
        return LineSeries;
    }
  };

  const getSeriesConfig = () => {
    const baseConfig = {
      dataSource: data,
      xName: xField,
      yName: yField,
      name: title || 'Series',
      fill: colors[0],
      animation: animationSettings,
      marker: {
        visible: type === 'line',
        width: 8,
        height: 8,
        fill: colors[0],
        border: { width: 2, color: '#FFFFFF' }
      }
    };

    if (type === 'area') {
      return {
        ...baseConfig,
        opacity: 0.7,
        border: { width: 3, color: colors[0] }
      };
    }

    if (type === 'column') {
      return {
        ...baseConfig,
        columnWidth: 0.6,
        columnSpacing: 0.1,
        border: { width: 0 }
      };
    }

    if (type === 'pie') {
      return {
        ...baseConfig,
        radius: '80%',
        innerRadius: '40%',
        startAngle: 0,
        endAngle: 360,
        explode: true,
        explodeOffset: '5%',
        explodeIndex: 0,
        pointColorMapping: pointColorMapping || undefined,
        palettes: colors
      };
    }

    return baseConfig;
  };

  return (
    <div className={`syncfusion-chart-container ${className}`}>
      <ChartComponent
        id={`chart-${Math.random().toString(36).substr(2, 9)}`}
        primaryXAxis={type !== 'pie' ? primaryXAxis : undefined}
        primaryYAxis={type !== 'pie' ? primaryYAxis : undefined}
        chartArea={chartArea}
        title={title}
        titleStyle={titleStyle}
        subTitle={subtitle}
        subTitleStyle={subTitleStyle}
        legendSettings={legendSettings}
        tooltip={tooltipSettings}
        height={`${height}px`}
        width={width}
        theme={theme}
        background='transparent'
        enableRtl={false}
        enablePersistence={false}
        highlightMode='Point'
        selectionMode='Point'
        isMultiSelect={false}
        highlightPattern='None'
        selectionPattern='None'
      >
        <Inject services={[
          LineSeries,
          AreaSeries,
          ColumnSeries,
          PieSeries,
          Category,
          DateTime,
          Legend,
          Tooltip,
          DataLabel,
          Highlight,
          Selection
        ]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            {...getSeriesConfig()}
            dataLabel={dataLabelSettings}
            highlightSettings={highlightSettings}
            selectionSettings={selectionSettings}
          />
        </SeriesCollectionDirective>
      </ChartComponent>
    </div>
  );
};

export default SyncfusionChart;