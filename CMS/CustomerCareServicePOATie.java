package CMS;

import org.omg.PortableServer.POA;

/**
 * Generated from IDL interface "CustomerCareService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public class CustomerCareServicePOATie
	extends CustomerCareServicePOA
{
	private CustomerCareServiceOperations _delegate;

	private POA _poa;
	public CustomerCareServicePOATie(CustomerCareServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public CustomerCareServicePOATie(CustomerCareServiceOperations delegate, POA poa)
	{
		_delegate = delegate;
		_poa = poa;
	}
	public CMS.CustomerCareService _this()
	{
		org.omg.CORBA.Object __o = _this_object() ;
		CMS.CustomerCareService __r = CMS.CustomerCareServiceHelper.narrow(__o);
		return __r;
	}
	public CMS.CustomerCareService _this(org.omg.CORBA.ORB orb)
	{
		org.omg.CORBA.Object __o = _this_object(orb) ;
		CMS.CustomerCareService __r = CMS.CustomerCareServiceHelper.narrow(__o);
		return __r;
	}
	public CustomerCareServiceOperations _delegate()
	{
		return _delegate;
	}
	public void _delegate(CustomerCareServiceOperations delegate)
	{
		_delegate = delegate;
	}
	public POA _default_POA()
	{
		if (_poa != null)
		{
			return _poa;
		}
		return super._default_POA();
	}
	public CMS.CustomerCare getTicketInfo(java.lang.String ticketId)
	{
		return _delegate.getTicketInfo(ticketId);
	}

	public CMS.CustomerCare[] getCustomerTicket(java.lang.String customerId)
	{
		return _delegate.getCustomerTicket(customerId);
	}

	public boolean updateTicket(java.lang.String ticketId, CMS.CustomerCare updateTicket)
	{
		return _delegate.updateTicket(ticketId,updateTicket);
	}

	public java.lang.String createTicket(CMS.CustomerCare ticket)
	{
		return _delegate.createTicket(ticket);
	}

}
