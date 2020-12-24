import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import {
  isToday,
  parseISO,
  differenceInBusinessDays,
  startOfMonth,
  isThisMonth,
  format,
  isThisYear,
  isBefore,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import low from '../../assets/low.png';
import up from '../../assets/up.png';

import history from '../../services/history';
import api from '../../services/api';

import {
  percentage3,
  percentage2,
  percentage4,
} from '../../util/calcPercentage';
import { formatPriceNoDollarSign } from '../../util/format';

import {
  Container,
  Content,
  BlockJob,
  BoxJob,
  BoxButton,
  BoxItem,
  BoxLeft,
  Block,
  BoxRight,
  Loading,
} from './styles';

function Main() {
  const { company } = useSelector((state) => state.user.profile);

  const [totalItens, setTotalItens] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [activeProduct, setActiveProduct] = useState(0);
  const [loading, setLoading] = useState(false);

  const [incash, setIncash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);

  const [totalCustomersDay, setTotalCustomersDay] = useState(0);
  const [averageServend, setAverageServend] = useState('0%');
  const [NegativeAverageServend, setNegativeAverageServend] = useState(false);

  const [totalToday, setTotalToday] = useState('0,00');
  const [averageBillingDay, setAverageBillingDay] = useState('0%');
  const [negativeBillingDay, setNegativeBillingDay] = useState(false);

  const [totalMonth, setTotalMonth] = useState('0,00');
  const [averageBillingMonth, setAverageBillingMonth] = useState('0%');
  const [negativeBillingMonth, setNegativeBillingMonth] = useState(false);

  useEffect(() => {
    async function loadItens() {
      setLoading(true);

      const response = await api.get(`company/${company.id}/products`);

      const { total, products } = response.data;
      setTotalItens(total);

      const lowstk = products.filter(
        (product) => product.amount_stock <= product.minimum_stock
      );
      setLowStock(lowstk.length);

      const activepdt = products.filter((product) => product.active);
      setActiveProduct(activepdt.length);

      setLoading(false);
    }

    async function loadDataSale() {
      // This function will handle data regarding payment methods
      function calcPaymentData(sales, total) {
        // calculation of percentage of cash payments

        const cash = sales.filter((sale) => sale.payment === 1);
        setIncash(percentage3(total, cash.length));

        // calculation of percentage of credit payments

        const crdt = sales.filter((sale) => sale.payment === 2);
        setCredit(percentage3(total, crdt.length));

        // caculation of percentage of debit payments

        const dbt = sales.filter((sale) => sale.payment === 3);
        setDebit(percentage3(total, dbt.length));
      }

      // This function will handle billing data for that month
      function calcBillingMonth(sales = [], callback, totalMonthSl) {
        setTotalMonth(totalMonthSl);

        const salesYear = sales.filter((sale) =>
          isThisYear(parseISO(sale.complete_at))
        );

        if (salesYear.length <= 0) {
          setNegativeBillingMonth(true);
          setAverageBillingMonth('0%');
          return;
        }

        const reducerCallback = (acumalator, currentValue) =>
          isBefore(
            parseISO(acumalator.complete_at),
            parseISO(currentValue.complete_at)
          )
            ? acumalator
            : currentValue;

        const firstSaleYear = salesYear.reduce(reducerCallback);

        const firstSaleMonth = Number(
          format(parseISO(firstSaleYear.complete_at), 'MM')
        );

        const dtmonthsWorked = 12 - firstSaleMonth;

        const monthsWorked =
          dtmonthsWorked === 0 && totalMonthSl > 0 ? 1 : dtmonthsWorked;

        const billingUntilLastMonth = salesYear.filter(
          (sale) => !isThisMonth(parseISO(sale.complete_at))
        );

        const averageAnnual =
          billingUntilLastMonth.length <= 0
            ? 0
            : billingUntilLastMonth.reduce(callback, 0);

        const currentBillingAverage = averageAnnual / monthsWorked;

        console.tron.log({
          label: 'dados do mes',
          inicio: firstSaleMonth,
          paraFimDoAno: monthsWorked,
          faturamentoAnumal: averageAnnual,
          paraProximoMes: currentBillingAverage,
          vendasDoMes: totalMonthSl,
        });

        if (currentBillingAverage <= 0) {
          setNegativeBillingMonth(false);
          setAverageBillingMonth('0%');
          return;
        }

        if (totalMonthSl < currentBillingAverage) {
          setNegativeBillingMonth(true);
          setAverageBillingMonth(
            `-${percentage2(currentBillingAverage, totalMonthSl)}%`
          );
        } else {
          setNegativeBillingMonth(false);
          setAverageBillingMonth(
            `${percentage4(currentBillingAverage, totalMonthSl)}%`
          );
        }
      }

      // This function will handle data regarding the number of customers served
      function calcCustomersServed(sales = [], monthSales = []) {
        const servendToday = sales.length;
        setTotalCustomersDay(servendToday);

        if (monthSales.length <= 0) {
          setNegativeAverageServend(false);
          setAverageServend('0%');
          return;
        }

        const reducerCallback = (acumalator, currentValue) =>
          isBefore(
            parseISO(acumalator.complete_at),
            parseISO(currentValue.complete_at)
          )
            ? acumalator
            : currentValue;

        const firstSaleMonth = monthSales.reduce(reducerCallback);

        const dtworkingDays = differenceInBusinessDays(
          parseISO(firstSaleMonth.complete_at),
          new Date()
        );

        const workingDays = dtworkingDays === 0 ? 1 : dtworkingDays;

        const untilDayBefore = monthSales.filter(
          (sale) => !isToday(parseISO(sale.complete_at))
        );

        const billingServend =
          untilDayBefore.length <= 0
            ? servendToday
            : untilDayBefore.length / workingDays;

        if (servendToday < billingServend) {
          setNegativeAverageServend(true);
          setAverageServend(`-${percentage2(servendToday, billingServend)}%`);
        } else {
          setNegativeAverageServend(false);
          setAverageServend(`${percentage4(billingServend, servendToday)}%`);
        }
      }

      // This function will handle data related to the day's billing
      function calcTotalSalesToday(sales, callback) {
        const todaySales = sales.filter((sale) =>
          isToday(parseISO(sale.complete_at))
        );

        const totalTodaySl =
          todaySales.length <= 0 ? 0 : todaySales.reduce(callback, 0);
        const formatedTotal = formatPriceNoDollarSign(totalTodaySl);

        setTotalToday(formatedTotal);

        const monthSales = sales.filter((sale) =>
          isThisMonth(parseISO(sale.complete_at))
        );

        /* calculate average sales per day this month */

        const reducerCallback = (acumalator, currentValue) =>
          isBefore(
            parseISO(acumalator.complete_at),
            parseISO(currentValue.complete_at)
          )
            ? acumalator
            : currentValue;

        const firstSaleMonth = monthSales.reduce(reducerCallback);

        const dtworkingDays = differenceInBusinessDays(
          new Date(),
          parseISO(firstSaleMonth.complete_at)
        );

        const workingDays = dtworkingDays;

        const untilDayBefore = monthSales.filter(
          (sale) => !isToday(parseISO(sale.complete_at))
        );

        const totalMonthSl =
          untilDayBefore.length <= 0 ? 0 : untilDayBefore.reduce(callback, 0);

        if (totalMonthSl === 0 && totalTodaySl === 0) {
          setNegativeBillingDay(false);
          setAverageBillingDay('0%');
          return;
        }

        const averageDay =
          totalMonthSl <= 0 ? totalTodaySl : totalMonthSl / workingDays;

        console.tron.log({
          label: 'dados do dia',
          vendasAteOntem: totalMonthSl,
          vendasDoMes: totalTodaySl,
          diasUteis: workingDays,
          media: averageDay,
        });

        if (averageDay > totalTodaySl) {
          setNegativeBillingDay(true);
          setAverageBillingDay(`-${percentage2(averageDay, totalTodaySl)}%`);
        } else {
          setNegativeBillingDay(false);
          setAverageBillingDay(`${percentage4(averageDay, totalTodaySl)}%`);
        }

        // calculate billing in the month

        calcBillingMonth(sales, callback, monthSales.reduce(callback, 0));

        calcCustomersServed(todaySales, monthSales);
      }

      // reducer callback

      const reducer = (acumalator, currentValue) =>
        acumalator + currentValue.total;

      setLoading(true);

      const response = await api.get(`company/${company.id}/sales/list`);

      const { sales: dtSales, total: ttal } = response.data;

      if (ttal === 0) {
        return;
      }

      // calculate payment data

      calcPaymentData(dtSales, ttal);

      // calculating total sales made today && average billing in the month

      calcTotalSalesToday(dtSales, reducer);

      setLoading(false);
    }

    loadItens();
    loadDataSale();
  }, [company]);

  return (
    <Container>
      {loading ? (
        <Loading>
          <FaSpinner color="#ccc" size={25} />
        </Loading>
      ) : (
        <Content>
          <BlockJob>
            <BoxJob setColor="#9cb5c8" popup={1}>
              <header>
                <h1>ESTOQUE</h1>
              </header>

              <body>
                <div>
                  <strong>PRODUTOS COM ESTOQUE BAIXO</strong>
                  <h2>{lowStock}</h2>
                </div>

                <div>
                  <strong>PRODUTOS CADASTRADOS</strong>
                  <h2>{totalItens}</h2>
                </div>

                <div>
                  <strong>PRODUTOS ATIVOS</strong>
                  <h2>{activeProduct}</h2>
                </div>
              </body>
            </BoxJob>
            <BoxButton setColor="#9cb5c8">
              <button
                type="button"
                onClick={() => history.push('/products/newItem')}
              >
                <strong>ADICIONAR ITEM</strong>
              </button>
            </BoxButton>
          </BlockJob>

          <BlockJob>
            <BoxJob setColor="#00bfdd" popup={2}>
              <header>
                <h1>{`VENDAS - ${format(new Date(), 'MMMM', {
                  locale: pt,
                }).toUpperCase()}`}</h1>
              </header>

              <body>
                <BoxItem>
                  <BoxLeft>
                    <strong>HOJE</strong>
                    <Block setColor="#00bfdd">
                      <span>R$</span>
                      <h2>{totalToday}</h2>
                    </Block>
                  </BoxLeft>
                  <BoxRight>
                    <span>{averageBillingDay}</span>
                    <img src={negativeBillingDay ? low : up} alt="" />
                  </BoxRight>
                </BoxItem>

                <BoxItem>
                  <BoxLeft>
                    <strong>FATURAMENTO NO MÊS</strong>
                    <Block setColor="#00bfdd">
                      <span>R$</span>
                      <h2>{totalMonth}</h2>
                    </Block>
                  </BoxLeft>
                  <BoxRight>
                    <span>{averageBillingMonth}</span>
                    <img src={negativeBillingMonth ? low : up} alt="" />
                  </BoxRight>
                </BoxItem>

                <BoxItem>
                  <BoxLeft>
                    <strong>CLIENTES ATENDIDOS HOJE</strong>
                    <Block setColor="#00bfdd">
                      <h2>{totalCustomersDay}</h2>
                    </Block>
                  </BoxLeft>
                  <BoxRight>
                    <span>{averageServend}</span>
                    <img src={NegativeAverageServend ? low : up} alt="" />
                  </BoxRight>
                </BoxItem>
              </body>
            </BoxJob>
            <BoxButton setColor="#00bfdd">
              <button type="button" onClick={() => history.push('/pdv')}>
                <span>ABRIR</span>
                <strong>PDV</strong>
              </button>
              <div />
              <button
                type="button"
                onClick={() => history.push('/customers/newCustomer')}
              >
                <span>NOVO</span>
                <strong>CLIENTE</strong>
              </button>
            </BoxButton>
          </BlockJob>

          <BlockJob>
            <BoxJob setColor="#44d4b5" popup={3}>
              <header>
                <h1>PAGAMENTOS</h1>
              </header>

              <body>
                <div>
                  <strong>A VISTA</strong>
                  <h2>{`${incash}%`}</h2>
                </div>

                <div>
                  <strong>CARTÃO DE CRÉDITO</strong>
                  <h2>{`${credit}%`}</h2>
                </div>

                <div>
                  <strong>CARTÃO DÉBITO</strong>
                  <h2>{`${debit}%`}</h2>
                </div>
              </body>
            </BoxJob>
          </BlockJob>
        </Content>
      )}
    </Container>
  );
}

export default Main;
